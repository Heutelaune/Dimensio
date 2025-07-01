console.log('Script startet...');
        
let currentScene = 'forest';
let particlesActive = true;
let particles = [];
let clickCount = 0;
let sceneReady = false;

// IDs der Autos auf der Hauptstraße
const carEntities = [
    ...document.querySelectorAll('#city-scene > a-entity[animation]')
];

// Warten bis A-Frame komplett geladen ist
document.querySelector('a-scene').addEventListener('loaded', function () {
    console.log('A-Frame Szene geladen!');
    sceneReady = true;
    setTimeout(initializeApp, 500);
});

function initializeApp() {
    console.log('Dimensio wird initialisiert...');
    
    setupEventListeners();
    generateParticles();
    updateStatus('Dimensio bereit!');
}

function handleClick(element) {
    clickCount++;
    console.log(`Klick #${clickCount} auf: ${element.id}`);
    // Klick-Effekt für alle
    element.setAttribute('animation__click', 'property: rotation; to: 0 360 0; dur: 1000; easing: easeInOutQuad');
    // Spezielle Aktionen
    switch(element.id) {
        // Neue Busch-Interaktionen - Beeren wachsen
        case 'bush1':
        case 'bush2':
        case 'bush3':
        case 'bush4':
        case 'bush5':
        case 'bush6':
        case 'bush7':
        case 'bush8':
        case 'bush9':
        case 'bush10':
        case 'bush11':
        case 'bush12':
        case 'bush13':
            growBerries(element);
            updateStatus('🫐 Beeren wachsen!');
            break;
        case 'building1':
            element.setAttribute('color', getRandomColor());
            updateStatus('🏢 Gebäude eingefärbt!');
            break;
        case 'building2':
            element.setAttribute('animation__grow', 'property: scale; to: 1 1.5 1; dur: 1000; dir: alternate');
            updateStatus('🏗️ Gebäude gewachsen!');
            break;
        case 'traffic-light':
            toggleTrafficLight();
            updateStatus('🚦 Ampel geschaltet!');
            break;
        case 'planet1':
            element.setAttribute('animation__spin', 'property: rotation; to: 0 720 0; dur: 2000');
            updateStatus('🪐 Planet rotiert!');
            break;
        case 'planet2':
            element.setAttribute('material', 'color: ' + getRandomColor());
            element.setAttribute('animation__pulse', 'property: scale; to: 1.2 1.2 1.2; dur: 500; dir: alternate; loop: 2');
            updateStatus('💫 Planet pulsiert!');
            break;
        case 'crystal':
            element.setAttribute('animation__sparkle', 'property: rotation; to: 45 360 45; dur: 1000');
            element.setAttribute('material', 'color: ' + getRandomColor() + '; emissive: #222222');
            updateStatus('💎 Kristall funkelt!');
            break;
        // Ampellichter einzeln anklickbar
        case 'red-light':
            document.getElementById('red-light').setAttribute('opacity', '1');
            document.getElementById('red-light').setAttribute('emissive', '#FF0000');
            document.getElementById('yellow-light').setAttribute('opacity', '0.3');
            document.getElementById('yellow-light').removeAttribute('emissive');
            document.getElementById('green-light').setAttribute('opacity', '0.3');
            document.getElementById('green-light').removeAttribute('emissive');
            updateStatus('🚦 Rot!');
            break;
        case 'yellow-light':
            document.getElementById('red-light').setAttribute('opacity', '0.3');
            document.getElementById('red-light').removeAttribute('emissive');
            document.getElementById('yellow-light').setAttribute('opacity', '1');
            document.getElementById('yellow-light').setAttribute('emissive', '#FFFF00');
            document.getElementById('green-light').setAttribute('opacity', '0.3');
            document.getElementById('green-light').removeAttribute('emissive');
            updateStatus('🚦 Gelb!');
            break;
        case 'green-light':
            document.getElementById('red-light').setAttribute('opacity', '0.3');
            document.getElementById('red-light').removeAttribute('emissive');
            document.getElementById('yellow-light').setAttribute('opacity', '0.3');
            document.getElementById('yellow-light').removeAttribute('emissive');
            document.getElementById('green-light').setAttribute('opacity', '1');
            document.getElementById('green-light').setAttribute('emissive', '#00FF00');
            updateStatus('🚦 Grün!');
            break;
        case 'planet-top-left': {
            const ring = document.getElementById('ring-top-left');
            if (ring && !ring.getAttribute('animation__spin')) {
                ring.setAttribute('animation__spin', 'property: rotation; to: 0 360 0; dur: 2000; loop: true; easing: linear');
                updateStatus('🪐 Ring rotiert!');
            }
            break;
        }
        case 'planet-top-right': {
            const ring = document.getElementById('ring-top-right');
            if (ring && !ring.getAttribute('animation__spin')) {
                ring.setAttribute('animation__spin', 'property: rotation; to: 0 360 0; dur: 2000; loop: true; easing: linear');
                updateStatus('🪐 Ring rotiert!');
            }
            break;
        }
        default:
            updateStatus('❓ Unbekanntes Objekt!');
    }
    // Klick-Counter updaten
    document.getElementById('click-count').textContent = clickCount;
}

function switchScene(sceneName) {
    // Alle Beeren entfernen (rote a-sphere mit radius 0.03)
    const scene = document.querySelector('a-scene');
    scene.querySelectorAll('a-sphere').forEach(sphere => {
        if (sphere.getAttribute('color') === '#FF0000' && sphere.getAttribute('radius') === '0.03') {
            if (sphere.parentNode) {
                sphere.parentNode.removeChild(sphere);
            }
        }
    });
    console.log(`Wechsel zu: ${sceneName}`);
    // Buttons updaten
    document.querySelectorAll('.control-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${sceneName}`).classList.add('active');
    // Szenen verstecken/zeigen
    document.getElementById('forest-scene').setAttribute('visible', sceneName === 'forest');
    document.getElementById('city-scene').setAttribute('visible', sceneName === 'city');
    document.getElementById('space-scene').setAttribute('visible', sceneName === 'space');
    // Hintergrund anpassen
    const title = document.getElementById('scene-title');
    switch(sceneName) {
        case 'forest':
            scene.setAttribute('background', 'color: #87CEEB');
            title.setAttribute('value', '🏞️ PARKSZENE');
            break;
        case 'city':
            scene.setAttribute('background', 'color: #708090');
            title.setAttribute('value', '🏙️ STADTSZENE');
            break;
        case 'space':
            scene.setAttribute('background', 'color: #000011');
            title.setAttribute('value', '🌌 WELTRAUMSZENE');
            break;
    }
    currentScene = sceneName;
    generateParticles();
    // Event-Listener neu setzen
    setTimeout(setupEventListeners, 100);
    updateStatus(`✅ ${sceneName} geladen`);
}

function generateParticles() {
    console.log('✨ Generiere Partikel...');
    clearParticles();
    if (!particlesActive) return;
    const container = document.getElementById('particle-container');
    if (!container) return;
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('a-entity');
        const x = (Math.random() - 0.5) * 8;
        const y = Math.random() * 3 + 1;
        const z = (Math.random() - 0.5) * 6;
        particle.setAttribute('position', `${x} ${y} ${z}`);
        switch(currentScene) {
            case 'forest':
                particle.setAttribute('geometry', 'primitive: plane; width: 0.1; height: 0.1');
                particle.setAttribute('material', 'color: #32CD32; transparent: true; opacity: 0.8');
                break;
            case 'city':
                particle.setAttribute('geometry', 'primitive: box; width: 0.05; height: 0.05; depth: 0.05');
                particle.setAttribute('material', 'color: #696969; transparent: true; opacity: 0.7');
                break;
            case 'space':
                particle.setAttribute('geometry', 'primitive: sphere; radius: 0.02');
                particle.setAttribute('material', 'color: white; emissive: white; transparent: true; opacity: 0.9');
                break;
        }
        particle.setAttribute('animation', `property: position; to: ${x} ${y + 1} ${z}; dur: ${2000 + Math.random() * 2000}; loop: true; dir: alternate`);
        container.appendChild(particle);
        particles.push(particle);
    }
    console.log(`✅ ${particles.length} Partikel erstellt`);
}

function clearParticles() {
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
    particles = [];
}

function toggleParticles() {
    particlesActive = !particlesActive;
    if (particlesActive) {
        generateParticles();
    } else {
        clearParticles();
    }
    document.getElementById('particle-status').textContent = particlesActive ? 'An' : 'Aus';
    updateStatus(`Partikel ${particlesActive ? 'aktiviert' : 'deaktiviert'}`);
}

function getRandomColor() {
    const colors = ['#FF6347', '#4169E1', '#32CD32', '#FFD700', '#FF69B4', '#00CED1', '#FF4500', '#DA70D6', '#00FF00', '#FF0000'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateStatus(message) {
    const status = document.getElementById('status');
    status.innerHTML = `<strong>Status:</strong> ${message}<br><strong>Klicks:</strong> <span id="click-count">${clickCount}</span><br><strong>Partikel:</strong> <span id="particle-status">${particlesActive ? 'An' : 'Aus'}</span>`;
    console.log('📊 Status:', message);
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '1': switchScene('forest'); break;
        case '2': switchScene('city'); break;
        case '3': switchScene('space'); break;
        case ' ': e.preventDefault(); toggleParticles(); break;
    }
});

function growBerries(bush) {
    const scene = document.querySelector('a-scene');
    const bushPos = bush.getAttribute('position');
    
    for (let i = 0; i < 5; i++) {
        const berry = document.createElement('a-sphere');
        const x = bushPos.x + (Math.random() - 0.5) * 0.3;
        const y = bushPos.y + 0.1 + Math.random() * 0.2;
        const z = bushPos.z + (Math.random() - 0.5) * 0.3;
        
        berry.setAttribute('position', `${x} ${y} ${z}`);
        berry.setAttribute('radius', '0.03');
        berry.setAttribute('color', '#FF0000');
        berry.setAttribute('animation__grow', 'property: scale; to: 1 1 1; dur: 800; easing: easeOut');
        berry.setAttribute('animation__bounce', 'property: position; to: ' + x + ' ' + (y + 0.05) + ' ' + z + '; dur: 1000; dir: alternate; loop: 2');
        
        scene.appendChild(berry);
    }
}

// Neue Funktion für Event-Listener Setup
function setupEventListeners() {
    console.log('Event-Listener werden gesetzt...');
    
    // Alle klickbaren Elemente finden
    const clickableElements = document.querySelectorAll('.clickable');
    console.log(`Gefunden: ${clickableElements.length} klickbare Elemente`);
    
    clickableElements.forEach((element, index) => {
        console.log(`Setup Element ${index + 1}: ${element.id || 'unnamed'}`);
        
        // Click Event
        element.addEventListener('click', function(evt) {
            console.log(`KLICK auf: ${this.id}`);
            handleClick(this);
            evt.stopPropagation();
            evt.preventDefault();
        });
        
        // Hover Effekte
        element.addEventListener('mouseenter', function() {
            console.log(`👆 Hover: ${this.id}`);
            this.setAttribute('scale', '1.1 1.1 1.1');
            document.querySelector('a-cursor').setAttribute('material', 'color: yellow');
        });
        
        element.addEventListener('mouseleave', function() {
            this.setAttribute('scale', '1 1 1');
            document.querySelector('a-cursor').setAttribute('material', 'color: red');
        });
    });
}

console.log('Script Setup abgeschlossen');

function toggleTrafficLight() {
    const red = document.getElementById('red-light');
    const yellow = document.getElementById('yellow-light');
    const green = document.getElementById('green-light');
    if (!red) return;
    // Ampel durchschalten (Rot → Gelb → Grün → Rot)
    if (red.getAttribute('opacity') === '1') {
        red.setAttribute('opacity', '0.3');
        red.removeAttribute('emissive');
        yellow.setAttribute('opacity', '1');
        yellow.setAttribute('emissive', '#FFFF00');
        green.setAttribute('opacity', '0.3');
        green.removeAttribute('emissive');
        setTimeout(() => {
            yellow.setAttribute('opacity', '0.3');
            yellow.removeAttribute('emissive');
            green.setAttribute('opacity', '1');
            green.setAttribute('emissive', '#00FF00');
            red.setAttribute('opacity', '0.3');
            red.removeAttribute('emissive');
        }, 1000);
        setTimeout(() => {
            green.setAttribute('opacity', '0.3');
            green.removeAttribute('emissive');
            red.setAttribute('opacity', '1');
            red.setAttribute('emissive', '#FF0000');
        }, 3000);
    }
} 