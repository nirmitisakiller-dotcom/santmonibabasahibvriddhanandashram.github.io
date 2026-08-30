(function () {
    'use strict';

    function setupRegisterModal() {
        var modal = document.getElementById('registerModal');
        if (!modal || modal.dataset.modalSystemReady === 'true') return;

        modal.dataset.modalSystemReady = 'true';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Register Loved Ones');

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
            panel.style.position = 'relative';
            panel.style.boxSizing = 'border-box';
            panel.style.width = 'min(680px, 100%)';
            panel.style.maxWidth = '680px';
            panel.style.maxHeight = 'calc(100vh - 40px)';
            panel.style.overflowY = 'auto';
            panel.style.backgroundColor = '#ffffff';
            panel.style.borderRadius = '12px';
            panel.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
            panel.style.padding = '28px';

            var closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = 'register-modal-close';
            closeButton.setAttribute('aria-label', 'Close registration form');
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

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.style.display !== 'none') {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    function init() {
        setupRegisterModal();
        var modal = document.getElementById('registerModal');
        if (!modal) return;

        var observer = new MutationObserver(function () {
            if (modal.style.display !== 'none') {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
