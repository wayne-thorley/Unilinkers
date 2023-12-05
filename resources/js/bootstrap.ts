import axios from 'axios';
/* eslint-disable @typescript-eslint/no-explicit-any */
( window as any ).axios = axios;
( window as any ).axios.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';
