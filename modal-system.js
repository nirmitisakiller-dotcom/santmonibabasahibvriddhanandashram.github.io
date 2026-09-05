(function () {
    'use strict';

    var SUPABASE_URL = 'https://ugdscjxgbyvopjfqsuti.supabase.co';
    var SUPABASE_KEY = 'sb_publishable_SjDafLyve7ipnvDg_nFB6A_WSYgga1H';
    var supabasePromise = null;

    function getSupabase() {
        if (!supabasePromise) {
            supabasePromise = import('https://esm.sh/@supabase/supabase-js@2').then(function (mod) {
                return mod.createClient(SUPABASE_URL, SUPABASE_KEY);
            });
        }
        return supabasePromise;
    }

    function getModal(id) {
        return document.getElementById(id);
    }

    function openSiteModal(id) {
        var modal = getModal(id);
        if (!modal) return false;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return false;
    }

    function closeSiteModal(id) {
        var modal = getModal(id);
        if (modal) modal.style.display = 'none';
        var open = document.querySelector('[role="dialog"][style*="display: flex"]');
        if (!open) document.body.style.overflow = '';
    }

    window.openSiteModal = openSiteModal;
    window.closeSiteModal = closeSiteModal;

    window.toggleAttachmentFields = function (value) {
        var box = document.getElementById('attachmentsBox');
        var app = document.getElementById('appFormUpload');
        var aadhaar = document.getElementById('aadhaarUpload');
        if (!box) return;
        var show = value === 'Internship';
        box.style.display = show ? 'block' : 'none';
        if (app) app.style.display = show ? 'block' : 'none';
        if (aadhaar) aadhaar.style.display = show ? 'block' : 'none';
    };

    function styleModal(modal, label) {
        if (!modal || modal.dataset.modalSystemReady === 'true') return;
        modal.dataset.modalSystemReady = 'true';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', label);
        Object.assign(modal.style, {
            position: 'fixed', inset: '0', width: '100%', height: '100%', boxSizing: 'border-box',
            padding: '20px', backgroundColor: 'rgba(0,0,0,0.65)', zIndex: '99999',
            alignItems: 'center', justifyContent: 'center', overflowY: 'auto'
        });

        var panel = modal.firstElementChild;
        if (panel) {
            Object.assign(panel.style, {
                position: 'relative', boxSizing: 'border-box', width: 'min(680px, 100%)',
                maxWidth: '680px', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto',
                backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
                padding: '28px'
            });

            if (modal.id !== 'volunteerModal') {
                var close = document.createElement('button');
                close.type = 'button';
                close.textContent = '×';
                close.setAttribute('aria-label', 'Close');
                Object.assign(close.style, {
                    position: 'absolute', top: '8px', right: '12px', width: '40px', height: '40px',
                    border: '0', borderRadius: '50%', background: 'transparent', color: '#7a2014',
                    fontSize: '32px', lineHeight: '40px', cursor: 'pointer', zIndex: '2'
                });
                close.addEventListener('click', function () { closeSiteModal(modal.id); });
                panel.insertBefore(close, panel.firstChild);
            }
        }

        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeSiteModal(modal.id);
        });
    }

    function addSimpleModal(id, title, body) {
        if (getModal(id)) return;
        var modal = document.createElement('div');
        modal.id = id;
        modal.style.display = 'none';
        modal.innerHTML = '<div><h2 style="color:#7a2014;text-align:center;margin-top:0;">' + title + '</h2>' + body + '</div>';
        document.body.appendChild(modal);
    }

    function ensureRegisterModal() {
        if (getModal('registerModal')) return;
        addSimpleModal('registerModal', 'Register Loved Ones',
            '<form>' +
            '<label><strong>Full Name</strong></label>' +
            '<input type="text" name="full_name" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">' +
            '<label><strong>Mobile Number</strong></label>' +
            '<input type="tel" name="mobile" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">' +
            '<label><strong>Details</strong></label>' +
            '<textarea name="details" required rows="4" style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;resize:vertical;"></textarea>' +
            '<button type="submit" style="width:100%;padding:14px;background:#FF9933;color:white;border:0;border-radius:6px;font-weight:bold;">Submit Registration</button>' +
            '</form>');
        getModal('registerModal').dataset.generatedByModalSystem = 'true';
        styleModal(getModal('registerModal'), 'Register Loved Ones');
        attachForm(getModal('registerModal'));
    }

    function ensureModals() {
        ensureRegisterModal();
        if (!getModal('volunteerModal')) {
            addSimpleModal('volunteerModal', 'Volunteer Registration Form', '<p>Please fill in the volunteer application.</p>');
        }
        if (!getModal('donateModal')) {
            addSimpleModal('donateModal', 'Scan & Donate', '');
        }
    }

    function updateDonationModal(id) {
        var modal = getModal(id);
        if (!modal) return;
        var panel = modal.firstElementChild;
        if (!panel) return;
        panel.innerHTML = '<h2 style="color:#7a2014;text-align:center;margin-top:0;">Scan &amp; Donate</h2>' +
            '<div style="text-align:center;">' +
            '<p style="color:#555;line-height:1.5;">Support Langar Seva &amp; Elderly Care</p>' +
            '<div style="text-align:center;margin-top:20px;padding:18px;background:#fff9f2;border:2px solid #ffdec2;border-radius:10px;">' +
            '<h3 style="margin:0 0 12px;color:#7a2014;">Scan &amp; Donate</h3>' +
            '<img src="IMG-20260828-WA0003.jpg" alt="PhonePe Donation QR Code" style="display:block;width:min(320px,100%);height:auto;margin:0 auto;border-radius:8px;">' +
            '</div>' +
            '<button type="button" onclick="closeSiteModal(\'' + id + '\')" style="width:100%;padding:14px;background:#555;color:white;border:0;border-radius:6px;margin-top:15px;">Close</button>' +
            '</div>';
    }

    function addFormValue(data, key, value) {
        if (key in data) {
            if (!Array.isArray(data[key])) data[key] = [data[key]];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }

    function safeFileName(name) {
        return String(name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120);
    }

    async function submitToSupabase(form) {
        var client = await getSupabase();
        var formData = new FormData(form);
        var data = {};
        var files = [];

        formData.forEach(function (value, key) {
            if (value instanceof File) {
                if (value.size > 0) files.push({ key: key, file: value });
            } else {
                addFormValue(data, key, value);
            }
        });

        var filePaths = [];
        for (var i = 0; i < files.length; i++) {
            var item = files[i];
            var path = 'volunteer/' + crypto.randomUUID() + '-' + safeFileName(item.file.name);
            var upload = await client.storage.from('volunteer-files').upload(path, item.file, {
                upsert: false,
                contentType: item.file.type || 'application/octet-stream'
            });
            if (upload.error) throw upload.error;
            filePaths.push(path);
        }

        var modal = form.closest('[id$="Modal"]');
        var formType = modal && modal.id === 'volunteerModal' ? 'Volunteer' : 'Register Loved Ones';
        var language = document.documentElement.lang || 'en';
        var languageName = language === 'hi' ? 'Hindi' : (language === 'mr' ? 'Marathi' : 'English');
        var payload = Object.assign({}, data, {
            _language: languageName,
            _file_paths: filePaths
        });

        var insert = await client.from('form_submissions').insert({
            form_type: formType,
            payload: payload,
            submission_data: data
        }).select('id').single();

        if (insert.error) throw insert.error;
        return insert.data;
    }

    function attachForm(modal) {
        if (!modal || modal.dataset.formReady === 'true') return;
        var form = modal.querySelector('form');
        if (!form) return;
        modal.dataset.formReady = 'true';
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            var button = form.querySelector('button[type="submit"], input[type="submit"]');
            var oldText = button ? (button.textContent || button.value) : '';
            if (button) {
                button.disabled = true;
                if ('value' in button && button.tagName === 'INPUT') button.value = 'Submitting...';
                else button.textContent = 'Submitting...';
            }
            try {
                await submitToSupabase(form);
                alert(modal.id === 'registerModal'
                    ? 'Thank you. Your registration form has been received.'
                    : 'Thank you for volunteering. Your application has been received.');
                form.reset();
                if (modal.id === 'volunteerModal') window.toggleAttachmentFields('');
                closeSiteModal(modal.id);
            } catch (error) {
                console.error('Supabase form submission failed:', error);
                alert('Sorry, the form could not be submitted right now. Please try again.');
            } finally {
                if (button) {
                    button.disabled = false;
                    if ('value' in button && button.tagName === 'INPUT') button.value = oldText;
                    else button.textContent = oldText;
                }
            }
        });
    }

    function installRegisterClickHandler() {
        document.addEventListener('click', function (event) {
            var target = event.target;
            var link = target && target.closest ? target.closest('a, button') : null;
            if (!link) return;
            if ((link.textContent || '').trim() !== 'Register Loved Ones') return;
            event.preventDefault();
            event.stopPropagation();
            ensureRegisterModal();
            openSiteModal('registerModal');
        }, true);
    }

    function init() {
        ensureModals();

        var volunteerModals = document.querySelectorAll('#volunteerModal');
        for (var i = 1; i < volunteerModals.length; i++) volunteerModals[i].remove();

        var registerModal = getModal('registerModal');
        if (registerModal) {
            registerModal.setAttribute('role', 'dialog');
            registerModal.setAttribute('aria-modal', 'true');
            registerModal.setAttribute('aria-label', 'Register Loved Ones');
        }

        styleModal(getModal('volunteerModal'), 'Volunteer');
        styleModal(getModal('donateModal'), 'Scan & Donate');
        styleModal(getModal('donationModal'), 'Scan & Donate');

        updateDonationModal('donateModal');
        updateDonationModal('donationModal');

        if (registerModal && registerModal.dataset.generatedByModalSystem === 'true') attachForm(registerModal);
        attachForm(getModal('volunteerModal'));
        installRegisterClickHandler();

        if (getModal('registerModal')) getModal('registerModal').style.display = 'none';
        if (getModal('donateModal')) getModal('donateModal').style.display = 'none';
        if (getModal('donationModal')) getModal('donationModal').style.display = 'none';
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        var modals = document.querySelectorAll('[role="dialog"]');
        for (var i = 0; i < modals.length; i++) {
            if (modals[i].style.display !== 'none') {
                closeSiteModal(modals[i].id);
                break;
            }
        }
    });
}());
