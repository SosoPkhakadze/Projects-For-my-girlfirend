document.addEventListener('DOMContentLoaded', function() {
  var pages = document.getElementsByClassName('page');
  const book = document.querySelector('.book');
  const content = document.querySelector('.content');

  let isOpen = false;

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    if (i % 2 === 0) {
      page.style.zIndex = (pages.length - i);
    }
  }

  for (var i = 0; i < pages.length; i++) {
    pages[i].pageNum = i + 1;
    pages[i].onclick = function() {
      if (this.pageNum % 2 === 0) {
        this.classList.remove('flipped');
        this.previousElementSibling.classList.remove('flipped');
      } else {
        this.classList.add('flipped');
        this.nextElementSibling.classList.add('flipped');
      }

      book.classList.toggle('open');
      content.style.display = isOpen ? 'block' : 'none';
      isOpen = !isOpen;
    }
  }
});
