import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { matchRoutes } from 'react-router-config';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
// import our main App component
import App from '../../src/App';
import Routes from '../../src/routes';

// import the manifest generated with the create-react-app build
import manifest from '../../build/asset-manifest.json';
// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);


const path = require("path");
const fs = require("fs");


export default (store) => (req, res, next) => {
    // get the html file created with the create-react-app build
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', async (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        let promises = [];
        const matchingRoutes = matchRoutes(Routes, req.url);
        matchingRoutes.forEach((route) => {
          const loadData = route && route.route && route.route.loadData
          if (loadData) {
            promises.push(loadData());
          }
        });

        
        const routerContext = {};
        const dataArray = await Promise.all(promises).then(dataArr => { 
          return dataArr
        });
        routerContext.dataArray = dataArray;

        // render the app as a string
        const modules = [];
        const sheet = new ServerStyleSheet()
        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={m => modules.push(m)}>
                <StaticRouter location={req.baseUrl} context={routerContext}>
                  <StyleSheetManager sheet={sheet.instance}>
                    <App/>
                  </StyleSheetManager>
                </StaticRouter>
            </Loadable.Capture>
        );

        const styleTags = sheet.getStyleTags();
        
        // get the stringified state
        const reduxState = JSON.stringify(routerContext);

        // map required assets to script tags
        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);

        // get HTML headers
        const helmet = Helmet.renderStatic();

        // now inject the rendered app into our html and send it to the client
        return res.send(
            htmlData
                // write the React app
                .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                // write the string version of our state
                .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${reduxState}`)
                .replace('__STYLES__', `${styleTags}`)
                // append the extra js assets
                .replace('</body>', extraChunks.join('') + '</body>')
                // write the HTML header tags
                .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
        );
    });
}