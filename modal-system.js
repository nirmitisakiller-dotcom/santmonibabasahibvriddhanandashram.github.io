(function () {
    'use strict';

    function setupModal(modalId, ariaLabel, closeLabel, closeClass) {
        var modal = document.getElementById(modalId);
        if (!modal || modal.dataset.modalSystemReady === 'true') return null;

        modal.dataset.modalSystemReady = 'true';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', ariaLabel);

        Object.assign(modal.style, {
            display: modal.style.display || 'none',
            position: 'fixed',
            inset: '0',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            padding: '20px',
            backgroundColor: 'rgba(0,0,0,0.65)',
            zIndex: '2000',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'auto'
        });

        var panel = modal.firstElementChild;
        if (panel) {
            Object.assign(panel.style, {
                position: 'relative',
                boxSizing: 'border-box',
                width: 'min(680px, 100%)',
                maxWidth: '680px',
                maxHeight: 'calc(100vh - 40px)',
                overflowY: 'auto',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
                padding: '28px'
            });

            var closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = closeClass;
            closeButton.setAttribute('aria-label', closeLabel);
            closeButton.textContent = '×';
            Object.assign(closeButton.style, {
                position: 'absolute',
                top: '8px',
                right: '12px',
                width: '40px',
                height: '40px',
                border: '0',
                borderRadius: '50%',
                background: 'transparent',
                color: '#7a2014',
                fontSize: '32px',
                lineHeight: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                zIndex: '2'
            });
            closeButton.addEventListener('click', closeModal);
            panel.insertBefore(closeButton, panel.firstChild);
        }

        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal();
        });

        function closeModal() {
            modal.style.display = 'none';
            updateBodyScroll();
        }

        return {
            modal: modal,
            close: closeModal
        };
    }

    var modalInstances = [];

    function updateBodyScroll() {
        var anyOpen = modalInstances.some(function (instance) {
            return instance && instance.modal && instance.modal.style.display !== 'none';
        });
        document.body.style.overflow = anyOpen ? 'hidden' : '';
    }

    function init() {
        modalInstances = [
            setupModal('registerModal', 'Register Loved Ones', 'Close registration form', 'register-modal-close'),
            setupModal('volunteerModal', 'Volunteer', 'Close volunteer form', 'volunteer-modal-close')
        ].filter(Boolean);

        modalInstances.forEach(function (instance) {
            var observer = new MutationObserver(updateBodyScroll);
            observer.observe(instance.modal, {
                attributes: true,
                attributeFilter: ['style']
            });
        });

        updateBodyScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;

        var openModal = modalInstances.find(function (instance) {
            return instance && instance.modal && instance.modal.style.display !== 'none';
        });

        if (openModal) openModal.close();
    });
}());
