document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');
    const mainContent = document.getElementById('dashboard-main');

    if(sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if(window.innerWidth > 992) {
                mainContent.classList.toggle('sidebar-collapsed');
            }
        });
    }

    // File Upload Interaction
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-upload');

    if(dropZone && fileInput) {
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-primary');
            dropZone.classList.add('bg-light');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-primary');
            dropZone.classList.remove('bg-light');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary');
            dropZone.classList.remove('bg-light');
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                updateFileName(e.dataTransfer.files[0].name);
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                updateFileName(fileInput.files[0].name);
            }
        });

        function updateFileName(name) {
            const label = dropZone.querySelector('p');
            if(label) {
                label.textContent = `Selected file: ${name}`;
                label.classList.add('text-primary');
                label.classList.add('fw-bold');
            }
        }
    }
});
