import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('user_id');
  const router = inject(Router);

  if (token) {
    if(state.url==='/login' || state.url == '/register'){
      router.navigate(['home'])
    }
    return true;
  }else if(state.url==='/login'){
    return true;
  }else if(state.url==='/register'){
    return true;
  }

  router.navigate(['/login'])
  return false;
};
