import React from 'react'
import Loadable from 'react-loadable';

const AsyncPageDefault = Loadable({
    loader: () => import(/* webpackChunkName: "pageDefault" */ './routes/Test1/Test1'),
    loading: () => <div>loading page...</div>,
    modules: ['Test1'],
});

const AsyncPageAnother = Loadable({
    loader: () => import(/* webpackChunkName: "pageAnother" */ './routes/Test2/Test2'),
    loading: () => <div>loading another page...</div>,
    modules: ['Test2'],
});


const Routes = [
  {
    path: '/',
    exact: true,
    component: AsyncPageDefault,
    loadData: () => {
      console.log('42343243')
      return '42343243'
    }
  },
  {
    path: '/posts',
    component: AsyncPageAnother,
    loadData: () => {
      console.log('fsjkhfdshjksdfjhk')
      return 'fsjkhfdshjksdfjhk'
    }
  }
];

export default Routes;