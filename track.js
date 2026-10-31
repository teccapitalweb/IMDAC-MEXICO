/* Métricas de visitas del sitio público (panel admin del Club > Métricas).
   Registro anónimo y ligero: un id por navegador (localStorage), sin
   cookies de terceros ni datos personales. Si falla (sin internet,
   bloqueador de rastreo, etc.) se ignora en silencio -- nunca bloquea
   la navegación del sitio. */
(function(){
  function vid(){
    try{
      var k='imdac_vid', v=localStorage.getItem(k);
      if(!v){v=(crypto.randomUUID?crypto.randomUUID():'v-'+Date.now()+'-'+Math.random().toString(16).slice(2));localStorage.setItem(k,v);}
      return v;
    }catch(e){return 'anon-'+Math.random().toString(16).slice(2);}
  }
  function dispositivo(){
    var ua=navigator.userAgent||'';
    if(/Tablet|iPad/i.test(ua))return 'tablet';
    if(/Mobi|Android|iPhone/i.test(ua))return 'movil';
    return 'computadora';
  }
  window.imdacTrack=function(pagina){
    try{
      var body={vid:vid(),ruta:location.pathname,pagina:pagina||document.title||location.pathname,dispositivo:dispositivo(),referrer:document.referrer||'',origen:'publico'};
      fetch('https://imdac-club-webhook-production.up.railway.app/track',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),keepalive:true}).catch(function(){});
    }catch(e){}
  };
})();
