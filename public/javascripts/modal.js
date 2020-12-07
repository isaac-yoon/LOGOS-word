export const addModalListeners = () => {
  const startModal = document.getElementById('start-modal');

  const closeStartModalButton = document.getElementById('start-game-modal-close');
  closeStartModalButton.addEventListener('click', () => {
    startModal.classList.add('inactive');
    });
}