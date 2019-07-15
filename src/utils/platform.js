const u = window.navigator.userAgent;

export const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export const isIphone = u.match(/(iPhone\sOS)\s([\d_]+)/);

export const isIpad = u.match(/(iPad).*OS\s([\d_]+)/);

export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

export const isWeixin = u.indexOf('MicroMessenger') > -1;

export const isMobile = isAndroid || isIphone;
