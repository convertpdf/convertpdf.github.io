// Shared utility functions for all tool pages

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showFileInfo(file) {
  const fileInfo = document.getElementById('file-info');
  const fileName = document.getElementById('file-name');
  const fileSize = document.getElementById('file-size');
  
  if (fileInfo && fileName && fileSize) {
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.classList.add('active');
  }
}

function showProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.classList.add('active');
    const fill = progressBar.querySelector('.progress-fill');
    if (fill) {
      let width = 0;
      const interval = setInterval(() => {
        width += Math.random() * 15;
        if (width >= 100) {
          width = 100;
          clearInterval(interval);
        }
        fill.style.width = width + '%';
      }, 200);
    }
  }
}

function hideProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.classList.remove('active');
    const fill = progressBar.querySelector('.progress-fill');
    if (fill) fill.style.width = '0%';
  }
}

function showResult() {
  const resultSection = document.getElementById('result-section');
  if (resultSection) {
    resultSection.classList.add('active');
  }
  hideProgress();
}

function showError(message) {
  const errorMsg = document.getElementById('error-message');
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.classList.add('active');
  }
  hideProgress();
}

function hideError() {
  const errorMsg = document.getElementById('error-message');
  if (errorMsg) {
    errorMsg.classList.remove('active');
  }
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Drag and drop handlers
function setupDragAndDrop(uploadZone, fileInput, onFileSelect) {
  if (!uploadZone || !fileInput) return;

  uploadZone.addEventListener('click', () => fileInput.click());
  
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      if (onFileSelect) onFileSelect(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0 && onFileSelect) {
      onFileSelect(e.target.files[0]);
    }
  });
}
