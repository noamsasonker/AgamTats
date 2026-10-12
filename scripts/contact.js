/**
 * AgamTats Studio - Booking & Contact Form Logic
 * Real client validation, Image attachment preview & Direct WhatsApp Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tattooBookingForm');
  if (!form) return;

  const fileInput = document.getElementById('referenceFileInput');
  const uploadZone = document.getElementById('uploadDropZone');
  const previewContainer = document.getElementById('imagePreviewWrap');
  const previewImg = document.getElementById('previewThumbnail');
  const removeImgBtn = document.getElementById('removeUploadedImage');
  const submitBtn = document.getElementById('submitBookingBtn');
  const successModal = document.getElementById('bookingSuccessModal');
  const successWaBtn = document.getElementById('successWhatsAppBtn');
  const closeSuccessBtn = document.getElementById('closeSuccessModal');

  let uploadedFile = null;

  // 1. File Upload Preview Handling
  if (fileInput && uploadZone) {
    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('border-white', 'bg-zinc-800/40');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('border-white', 'bg-zinc-800/40');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('border-white', 'bg-zinc-800/40');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFileSelect(fileInput.files[0]);
      }
    });
  }

  function handleFileSelect(file) {
    if (!file.type.startsWith('image/')) {
      window.showToast('אנא בחרו קובץ תמונה בלבד (JPG, PNG)');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      window.showToast('גודל הקובץ חורג מ-15MB');
      return;
    }

    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (previewImg) previewImg.src = e.target.result;
      if (previewContainer) previewContainer.classList.remove('hidden');
      if (uploadZone) uploadZone.classList.add('hidden');
    };
    reader.readAsDataURL(file);
  }

  if (removeImgBtn) {
    removeImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      uploadedFile = null;
      if (fileInput) fileInput.value = '';
      if (previewContainer) previewContainer.classList.add('hidden');
      if (uploadZone) uploadZone.classList.remove('hidden');
    });
  }

  // 2. Form Submission & WhatsApp Message Generator
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const instagram = document.getElementById('instagram').value.trim();
    const style = document.getElementById('tattooStyle').value;
    const placement = document.getElementById('tattooPlacement').value.trim();
    const size = document.getElementById('tattooSize').value.trim();
    const description = document.getElementById('tattooDescription').value.trim();

    if (!fullName || !phone || !style || !placement || !description) {
      window.showToast('נא למלא את כל שדות החובה המסומנים ב-*');
      return;
    }

    const consent = document.getElementById('contactConsent');
    if (consent && !consent.checked) {
      window.showToast('יש לאשר את תנאי השימוש ומדיניות הפרטיות להמשך');
      return;
    }

    // Button loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      שולח פרטים...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Construct formatted WhatsApp message with full request details
      let waText = `היי אגם, ברצוני לתאם תור וייעוץ לקעקוע בסטודיו בצפת:\n\n`;
      waText += `• שם מלא: ${fullName}\n`;
      waText += `• טלפון: ${phone}\n`;
      if (instagram) waText += `• אינסטגרם: ${instagram}\n`;
      waText += `• סגנון מבוקש: ${style}\n`;
      waText += `• מיקום בגוף: ${placement}\n`;
      if (size) waText += `• גודל משוער: ${size} ס"מ\n`;
      waText += `• תיאור הרעיון: ${description}\n`;
      if (uploadedFile) waText += `• צירפתי תמונת השראה\n`;

      const encodedMsg = encodeURIComponent(waText);
      const waUrl = `https://wa.me/972559531511?text=${encodedMsg}`;

      if (successWaBtn) {
        successWaBtn.href = waUrl;
      }

      // Show Success Modal
      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
      if (removeImgBtn) removeImgBtn.click();
    }, 700);
  });

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }
});
