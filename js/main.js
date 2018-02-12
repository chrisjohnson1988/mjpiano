function focusedSection() {
  var pos = $(document).scrollTop() + $(window).height()/2;
  var sections = $('section')
  for(var i = 0; i<sections.length; i++) {
    if(sections[i].offsetTop > pos) {
      return sections[Math.max(i-1, 0)];
    }
  }
  return sections.last()[0];
}

function updateSelected() {
  var hash = window.location.hash.substring(1)
  if(hash) { $('body').attr('data-selected', hash); }
}

function setSelected(section) {
  var selected = $('body').attr('data-selected');
  if(selected != section) {
    history.replaceState(undefined, undefined, "#" + section);
  }
  $('body').attr('data-selected', section);
}

$(document).ready(function() {
  $('nav a').click(function() { 
    setSelected($(this).attr('href').substring(1)); 
    return false;
  });

  $(window).scroll(function() {
    if($(document).width() <= 960) {
      setSelected(focusedSection().id);
    }
  });

  $(window).on('hashchange', updateSelected);
});