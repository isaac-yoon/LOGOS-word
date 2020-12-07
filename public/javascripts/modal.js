export const addModalListeners = () => {
  const startModal = document.getElementById('start-modal');

  const closeStartModalButton = document.getElementById('start-game-modal-close');
  closeStartModalButton.addEventListener('click', () => {
    console.log('close modal was pressed!');
    startModal.classList.add('inactive');
    });
}