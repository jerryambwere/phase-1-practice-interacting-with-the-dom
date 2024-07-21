document.addEventListener('DOMContentLoaded', () => {
    const counterDisplay = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const likeButton = document.getElementById('like');
    const pauseButton = document.getElementById('pause');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');
  
    let counterValue = 0;
    let timer;
  
    // Timer incrementing every second
    function startTimer() {
      timer = setInterval(() => {
        counterValue++;
        counterDisplay.textContent = counterValue;
      }, 1000);
    }
  
    // Manual increment and decrement of counter
    plusButton.addEventListener('click', () => {
      counterValue++;
      counterDisplay.textContent = counterValue;
    });
  
    minusButton.addEventListener('click', () => {
      counterValue--;
      counterDisplay.textContent = counterValue;
    });
  
    // "Like" button functionality
    likeButton.addEventListener('click', () => {
      const currentCount = counterValue;
      const existingLike = document.getElementById(`like-${currentCount}`);
      if (existingLike) {
        const count = parseInt(existingLike.dataset.count) + 1;
        existingLike.textContent = `${currentCount} has been liked ${count} times`;
        existingLike.dataset.count = count;
      } else {
        const newLike = document.createElement('li');
        newLike.id = `like-${currentCount}`;
        newLike.dataset.count = 1;
        newLike.textContent = `${currentCount} has been liked 1 time`;
        commentList.appendChild(newLike);
      }
    });
  
    // Pause button functionality
    let isPaused = false;
    pauseButton.addEventListener('click', () => {
      if (!isPaused) {
        clearInterval(timer);
        minusButton.disabled = true;
        plusButton.disabled = true;
        likeButton.disabled = true;
        pauseButton.textContent = 'Resume';
        isPaused = true;
      } else {
        startTimer();
        minusButton.disabled = false;
        plusButton.disabled = false;
        likeButton.disabled = false;
        pauseButton.textContent = 'Pause';
        isPaused = false;
      }
    });
  
    // Comment submission
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const commentText = commentInput.value.trim();
      if (commentText !== '') {
        const newComment = document.createElement('li');
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = '';
      }
    });
  
    // Start the timer when the page loads
    startTimer();
  });
  