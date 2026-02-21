import { Routes } from '@angular/router';


export const routes: Routes = [

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard.component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'interns',
    loadComponent: () =>
      import('./interns/intern-list/intern-list.component')
        .then(m => m.InternListComponent)
  },

  {
    path: 'interns/new',
    loadComponent: () =>
      import('./interns/intern-form/intern-form.component')
        .then(m => m.InternFormComponent)
  },

  {
    path: 'batches',
    loadComponent: () =>
      import('./batches/batch-list/batch-list.component')
        .then(m => m.BatchListComponent)
  },

  
  {
    path: 'interns/edit/:id',
    loadComponent: () =>
      import('./interns/intern-form/intern-form.component')
        .then(m => m.InternFormComponent)
  },

  {
    path: 'batches/new',
    loadComponent: () =>
      import('./batches/batch-form/batch-form.component')
        .then(m => m.BatchFormComponent)
  },
  {
  path: 'report',
  loadComponent: () =>
    import('../report/report.component')
      .then(m => m.ReportsComponent)
},


  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

];

