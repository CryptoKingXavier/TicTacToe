document.addEventListener('DOMContentLoaded', () => {

    // Modal Toggling Greeting
    const modal = document.querySelector("[data-modal]");
    const open_btn = document.querySelector("[data-open-modal]");
    const close_btn = document.querySelector("[data-close-modal]");

    open_btn.onclick = () => {
        modal.showModal()
        modal.className = "modal"
    }
    close_btn.onclick = () => {
        modal.className = ""
        modal.close()
    }

    open_btn.click()
})