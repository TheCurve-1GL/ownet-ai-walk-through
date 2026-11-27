(function(){
  var q = new URLSearchParams(location.search);
  var raw = q.get('for') || q.get('account') || '';
  var name = raw.replace(/[+_]/g,' ').replace(/[^A-Za-z0-9 &.,'\-]/g,'').replace(/\s+/g,' ').trim().slice(0,40);
  if (!name) return;
  document.querySelectorAll('.for').forEach(function(el){ el.querySelector('.for-name').textContent = name; el.hidden = false; });
  document.title = document.title + ' · for ' + name;
  document.querySelectorAll('a[data-keep]').forEach(function(a){
    var u = new URL(a.getAttribute('href'), location.href); u.searchParams.set('for', name); a.href = u.pathname + u.search + u.hash;
  });
  document.querySelectorAll('a[data-call]').forEach(function(a){
    a.href = 'mailto:info@ownet.co.uk?subject=' + encodeURIComponent('Book a 30-minute AI call (' + name + ')');
  });
  var h = document.querySelector('.cta h2'); if (h) h.textContent = 'Talk to us about AI at ' + name;
})();
