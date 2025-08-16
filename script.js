document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    const state = {
        currentImageIndex: 13,
        totalImages: 25,
        zoomLevel: 1,
        panning: false,
        startPan: { x: 0, y: 0 },
        imageOffset: { x: 0, y: 0 },
        activeStructureId: 'arteries-carotid',
        activeTool: 'pointer', // 'pointer', 'measure'
        measurePoints: [],
        annotations: {}, // { imageIndex: [ {type, points...} ] }
        sidebarCollapsed: false,
    };

    // --- MOCK DATA ---
    const anatomyData = [
        // ... (Expanded data)
        { id: 'arteries', name: 'Arteries', icon: 'arteres.png', children: [
            { id: 'arteries-carotid', name: 'Internal carotid artery', description: 'A major paired artery, one on each side of the head and neck...', annotations: { 13: [{x: 450, y: 550}] } },
            { id: 'arteries-basilar', name: 'Basilar artery', description: 'Part of the blood supply to the brain...', annotations: { 13: [{x: 600, y: 700}] } },
            { id: 'arteries-vertebral', name: 'Vertebral artery', description: 'Major arteries of the neck...', annotations: { 14: [{x: 500, y: 650}] } },
        ]},
        { id: 'lobes', name: 'Lobes & Gyri', icon: 'gyrus-cerveau.png', children: [
            { id: 'lobes-frontal', name: 'Frontal lobe', description: 'Located at the front of the brain...', annotations: { 10: [{x: 600, y: 300}] } },
            { id: 'lobes-limbic', name: 'Limbic lobe', description: 'An arc-shaped region of cortex...', annotations: { 11: [{x: 550, y: 450}] } },
            { id: 'gyri-precentral', name: 'Precentral gyrus', description: 'A prominent gyrus on the surface of the posterior frontal lobe...', annotations: { 12: [{x: 700, y: 350}] } },
        ]},
        { id: 'nuclei', name: 'Deep Structures', icon: 'cerveau-noyaux-de-la-base.png', children: [
            { id: 'nuclei-basal', name: 'Basal nuclei', description: 'A group of subcortical nuclei...', annotations: { 15: [{x: 650, y: 500}] } },
            { id: 'nuclei-thalamus', name: 'Thalamus', description: 'A large mass of gray matter in the dorsal part of the diencephalon...', annotations: { 16: [{x: 610, y: 520}] } },
        ]},
    ];

    // --- DOM ELEMENTS ---
    const viewer = document.getElementById('anatomy-viewer-1');
    const image = document.querySelector('.main-anatomy-image');
    const imageCounter = document.getElementById('image-counter');
    const imageSlider = document.getElementById('image-slider');
    const structureListContainer = document.getElementById('structure-list');
    const annotationCanvas = document.querySelector('.annotation-canvas');
    const ctx = annotationCanvas.getContext('2d');
    const infoTitle = document.getElementById('annotation-details'); // Re-using for simplicity

    // --- INITIALIZATION ---
    function init() {
        setupEventListeners();
        updateImage();
        renderStructureList();
        resizeCanvas();
    }

    // --- CANVAS & ANNOTATION LOGIC ---
    function resizeCanvas() {
        annotationCanvas.width = viewer.clientWidth;
        annotationCanvas.height = viewer.clientHeight;
        drawAnnotations();
    }

    function drawAnnotations() {
        ctx.clearRect(0, 0, annotationCanvas.width, annotationCanvas.height);

        const structure = findStructureById(state.activeStructureId);
        if (structure && structure.annotations && structure.annotations[state.currentImageIndex]) {
            const points = structure.annotations[state.currentImageIndex];
            points.forEach(p => drawPoint(p.x, p.y, '#3b82f6'));
        }
    }

    function drawPoint(x, y, color) {
        const transformed = worldToCanvas({x, y});
        ctx.beginPath();
        ctx.arc(transformed.x, transformed.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // --- COORDINATE TRANSFORMATION ---
    function worldToCanvas(point) {
        const rect = image.getBoundingClientRect();
        const viewerRect = viewer.getBoundingClientRect();
        const x = (point.x * state.zoomLevel) + rect.left - viewerRect.left;
        const y = (point.y * state.zoomLevel) + rect.top - viewerRect.top;
        return { x, y };
    }

    // --- IMAGE VIEWER LOGIC ---
    function updateImage() {
        const imageNumber = state.currentImageIndex + 1;
        image.src = `https://placehold.co/1200x900/000000/FFFFFF?text=Anatomy+Image+${imageNumber}`;
        imageCounter.textContent = `${imageNumber} / ${state.totalImages}`;
        imageSlider.value = state.currentImageIndex;
        drawAnnotations();
    }

    function resetImageView() {
        state.zoomLevel = 1;
        state.imageOffset = { x: 0, y: 0 };
        applyTransform();
    }

    function applyTransform() {
        image.style.transform = `translate(${state.imageOffset.x}px, ${state.imageOffset.y}px) scale(${state.zoomLevel})`;
        drawAnnotations();
    }

    // --- SIDEBAR & INFO PANEL LOGIC ---
    function renderStructureList() {
        let html = '';
        const searchTerm = document.getElementById('structure-search').value.toLowerCase();
        anatomyData.forEach(category => {
            const filteredChildren = category.children.filter(child => child.name.toLowerCase().includes(searchTerm));
            if (filteredChildren.length > 0) {
                html += `<div class="border-b">
                    <div class="structure-list-item parent-item accordion-toggle">
                        <span>${category.name}</span>
                        <i class="fas fa-chevron-down transition-transform"></i>
                    </div>
                    <div class="accordion-content">`;
                filteredChildren.forEach(child => {
                    html += `<div class="structure-list-item child-item ${child.id === state.activeStructureId ? 'active' : ''}" data-id="${child.id}"><span>${child.name}</span></div>`;
                });
                html += `</div></div>`;
            }
        });
        structureListContainer.innerHTML = html;
        addSidebarEventListeners();
    }

    function findStructureById(id) {
        for (const category of anatomyData) {
            const found = category.children.find(child => child.id === id);
            if (found) return found;
        }
        return null;
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        document.getElementById('reset-view').addEventListener('click', resetImageView);

        imageSlider.addEventListener('input', (e) => {
            state.currentImageIndex = parseInt(e.target.value, 10);
            updateImage();
        });

        document.getElementById('prev-image').addEventListener('click', () => {
            if(state.currentImageIndex > 0) {
                state.currentImageIndex--;
                updateImage();
            }
        });
        document.getElementById('next-image').addEventListener('click', () => {
            if(state.currentImageIndex < state.totalImages - 1) {
                state.currentImageIndex++;
                updateImage();
            }
        });

        viewer.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left mouse button
                state.panning = true;
                state.startPan = { x: e.clientX - state.imageOffset.x, y: e.clientY - state.imageOffset.y };
                viewer.style.cursor = 'grabbing';
            }
        });
        window.addEventListener('mouseup', () => {
            state.panning = false;
            viewer.style.cursor = 'grab';
        });
        window.addEventListener('mousemove', (e) => {
            if (state.panning) {
                state.imageOffset.x = e.clientX - state.startPan.x;
                state.imageOffset.y = e.clientY - state.startPan.y;
                applyTransform();
            }
        });

        viewer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = viewer.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const zoomAmount = e.deltaY * -0.001;
            const newZoomLevel = Math.max(0.5, Math.min(5, state.zoomLevel + zoomAmount));

            const worldX = (mouseX - state.imageOffset.x) / state.zoomLevel;
            const worldY = (mouseY - state.imageOffset.y) / state.zoomLevel;

            state.imageOffset.x = mouseX - worldX * newZoomLevel;
            state.imageOffset.y = mouseY - worldY * newZoomLevel;
            state.zoomLevel = newZoomLevel;

            applyTransform();
        });

        document.getElementById('structure-search').addEventListener('input', renderStructureList);
        document.getElementById('toggle-sidebar').addEventListener('click', () => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
            document.getElementById('sidebar').classList.toggle('collapsed');
            window.dispatchEvent(new Event('resize'));
        });

        window.addEventListener('resize', resizeCanvas);
    }

    function addSidebarEventListeners() {
        document.querySelectorAll('.accordion-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector('i');
                const isOpened = content.style.maxHeight;

                document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
                document.querySelectorAll('.accordion-toggle i').forEach(i => i.style.transform = 'rotate(0deg)');

                if (!isOpened) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.style.transform = 'rotate(-180deg)';
                }
            });
        });

        document.querySelectorAll('.child-item').forEach(item => {
            item.addEventListener('click', () => {
                state.activeStructureId = item.dataset.id;
                renderStructureList();
                drawAnnotations();
            });
        });
    }

    // --- RUN ---
    init();
});
