// Estado del juego
let gameState = {
    players: [],
    currentPlayerIndex: 0,
    selectedCategory: null,
    secretWord: '',
    impostorIndex: -1,
    roundNumber: 1,
    revealedPlayers: [],
    eliminatedPlayers: [],
    selectedVote: null,
    startingPlayer: -1
};

// Categorías con muchas palabras
const categories = {
    '🎬 Famosos': [
        'Messi', 'Cristiano', 'Shakira', 'Rihanna', 'Drake', 'Beyoncé',
        'Ariana', 'Billie', 'Taylor', 'Dua Lipa', 'Bad Bunny', 'J Balvin',
        'Rosalía', 'Karol G', 'Anuel', 'Ozuna', 'Maluma', 'Nicky Jam',
        'Daddy Yankee', 'Neymar', 'Ronaldo', 'LeBron', 'Jordan', 'Kobe',
        'Serena', 'Nadal', 'Federer', 'Hamilton', 'Verstappen', 'Vettel'
    ],
    '🍔 Comidas': [
        'Pizza', 'Hamburguesa', 'Pasta', 'Sushi', 'Tacos', 'Burrito',
        'Empanadas', 'Arepa', 'Paella', 'Ceviche', 'Ramen', 'Pho',
        'Curry', 'Lasaña', 'Enchiladas', 'Quesadilla', 'Nachos', 'Hot Dog',
        'Sandwich', 'Kebab', 'Falafel', 'Shawarma', 'Pollo', 'Asado',
        'Milanesa', 'Tamales', 'Pupusa', 'Bandeja', 'Sancocho', 'Mondongo'
    ],
    '🥤 Bebidas': [
        'Café', 'Coca Cola', 'Pepsi', 'Sprite', 'Fanta', 'RedBull',
        'Monster', 'Gatorade', 'Agua', 'Cerveza', 'Vino', 'Whisky',
        'Vodka', 'Ron', 'Tequila', 'Mojito', 'Margarita', 'Piña Colada',
        'Smoothie', 'Limonada', 'Horchata', 'Jamaica', 'Tamarindo',
        'Chocolate', 'Té', 'Matcha', 'Cappuccino', 'Latte', 'Frappé', 'Jugo'
    ],
    '🌎 Países': [
        'Argentina', 'Brasil', 'México', 'Colombia', 'España', 'Chile',
        'Perú', 'Venezuela', 'Ecuador', 'Uruguay', 'Paraguay', 'Bolivia',
        'Francia', 'Italia', 'Alemania', 'Inglaterra', 'Portugal', 'Holanda',
        'Japón', 'China', 'Corea', 'India', 'Australia', 'Canadá',
        'Estados Unidos', 'Rusia', 'Turquía', 'Grecia', 'Egipto', 'Marruecos'
    ],
    '🏙️ Ciudades': [
        'París', 'Londres', 'Nueva York', 'Tokyo', 'Roma', 'Barcelona',
        'Madrid', 'Buenos Aires', 'Ciudad de México', 'Bogotá', 'Lima',
        'Santiago', 'Montevideo', 'Caracas', 'Quito', 'Miami', 'Los Ángeles',
        'Chicago', 'Toronto', 'Vancouver', 'Sydney', 'Melbourne', 'Berlín',
        'Ámsterdam', 'Dubai', 'Singapur', 'Hong Kong', 'Seúl', 'Bangkok', 'Estambul'
    ],
    '🎮 Videojuegos': [
        'Minecraft', 'Fortnite', 'FIFA', 'GTA', 'Mario', 'Zelda',
        'Pokemon', 'Roblox', 'Among Us', 'Call of Duty', 'Valorant', 'LOL',
        'Apex', 'Overwatch', 'Counter Strike', 'Rocket League', 'Fall Guys',
        'Clash Royale', 'Brawl Stars', 'Free Fire', 'PUBG', 'Warzone',
        'Halo', 'Gears', 'Uncharted', 'Spider-Man', 'God of War', 'Sonic', 'Pac-Man', 'Tetris'
    ],
    '🎵 Géneros Musicales': [
        'Pop', 'Rock', 'Reggaeton', 'Salsa', 'Bachata', 'Merengue',
        'Cumbia', 'Vallenato', 'Ranchera', 'Corrido', 'Trap', 'Hip Hop',
        'Rap', 'Jazz', 'Blues', 'Country', 'Folk', 'Metal', 'Punk',
        'Electrónica', 'House', 'Techno', 'Dubstep', 'Reggae', 'Ska',
        'Funk', 'Soul', 'R&B', 'Gospel', 'Clásica'
    ],
    '🐾 Animales': [
        'Perro', 'Gato', 'León', 'Tigre', 'Elefante', 'Jirafa',
        'Zebra', 'Mono', 'Gorila', 'Panda', 'Koala', 'Canguro',
        'Delfín', 'Ballena', 'Tiburón', 'Pez', 'Águila', 'Halcón',
        'Búho', 'Loro', 'Pingüino', 'Oso', 'Lobo', 'Zorro',
        'Conejo', 'Ardilla', 'Ratón', 'Caballo', 'Vaca', 'Cerdo'
    ],
    '⚽ Deportes': [
        'Fútbol', 'Baloncesto', 'Tenis', 'Voleibol', 'Béisbol', 'Golf',
        'Boxeo', 'MMA', 'Natación', 'Atletismo', 'Gimnasia', 'Ciclismo',
        'Motociclismo', 'Fórmula 1', 'Rally', 'Surf', 'Skate', 'BMX',
        'Esquí', 'Snowboard', 'Hockey', 'Rugby', 'Fútbol Americano', 'Críquet',
        'Ping Pong', 'Badminton', 'Karate', 'Judo', 'Taekwondo', 'Esgrima'
    ],
    '🎬 Películas': [
        'Titanic', 'Avatar', 'Avengers', 'Star Wars', 'Toy Story', 'Frozen',
        'Coco', 'Encanto', 'Shrek', 'Madagascar', 'Harry Potter', 'Matrix',
        'Gladiador', 'Inception', 'Interstellar', 'Batman', 'Superman', 'Spider-Man',
        'Iron Man', 'Joker', 'Parasite', 'Roma', 'Coco', 'Up',
        'Wall-E', 'Ratatouille', 'Nemo', 'Monsters', 'Cars', 'Brave'
    ],
    '📱 Redes Sociales': [
        'Facebook', 'Instagram', 'Twitter', 'TikTok', 'YouTube', 'Snapchat',
        'WhatsApp', 'Telegram', 'Discord', 'Reddit', 'Pinterest', 'LinkedIn',
        'Twitch', 'Spotify', 'Netflix', 'Amazon', 'eBay', 'Mercado Libre',
        'Uber', 'Rappi', 'DiDi', 'Tinder', 'Bumble', 'Zoom',
        'Skype', 'Teams', 'Slack', 'Gmail', 'Outlook', 'Google'
    ],
    '🎨 Colores': [
        'Rojo', 'Azul', 'Verde', 'Amarillo', 'Naranja', 'Violeta',
        'Rosa', 'Negro', 'Blanco', 'Gris', 'Marrón', 'Dorado',
        'Plateado', 'Turquesa', 'Morado', 'Lila', 'Celeste', 'Coral',
        'Salmón', 'Beige', 'Crema', 'Oliva', 'Menta', 'Lavanda',
        'Fucsia', 'Magenta', 'Cyan', 'Índigo', 'Carmesí', 'Esmeralda'
    ],
    '🏢 Profesiones': [
        'Médico', 'Enfermero', 'Profesor', 'Ingeniero', 'Arquitecto', 'Abogado',
        'Contador', 'Chef', 'Mesero', 'Barista', 'Policía', 'Bombero',
        'Piloto', 'Azafata', 'Taxista', 'Conductor', 'Mecánico', 'Electricista',
        'Plomero', 'Carpintero', 'Pintor', 'Fotógrafo', 'Diseñador', 'Programador',
        'Dentista', 'Veterinario', 'Psicólogo', 'Periodista', 'Actor', 'Músico'
    ],
    '🏠 Objetos del Hogar': [
        'Sofá', 'Mesa', 'Silla', 'Cama', 'Almohada', 'Lámpara',
        'Televisor', 'Refrigerador', 'Estufa', 'Microondas', 'Lavadora', 'Secadora',
        'Plancha', 'Aspiradora', 'Ventilador', 'Calefactor', 'Aire Acondicionado',
        'Espejo', 'Cuadro', 'Cortina', 'Alfombra', 'Reloj', 'Teléfono',
        'Computadora', 'Teclado', 'Mouse', 'Monitor', 'Impresora', 'Router', 'Bocinas'
    ],
    '🌳 Naturaleza': [
        'Árbol', 'Flor', 'Rosa', 'Girasol', 'Margarita', 'Orquídea',
        'Cactus', 'Palmera', 'Pino', 'Roble', 'Sauce', 'Bambú',
        'Montaña', 'Volcán', 'Río', 'Lago', 'Mar', 'Océano',
        'Playa', 'Desierto', 'Selva', 'Bosque', 'Pradera', 'Valle',
        'Cascada', 'Arcoíris', 'Nube', 'Lluvia', 'Nieve', 'Trueno'
    ],
    '🎸 Instrumentos': [
        'Guitarra', 'Piano', 'Batería', 'Bajo', 'Violín', 'Trompeta',
        'Saxofón', 'Flauta', 'Clarinete', 'Oboe', 'Acordeón', 'Armónica',
        'Ukelele', 'Banjo', 'Mandolina', 'Arpa', 'Xilófono', 'Maracas',
        'Bongó', 'Conga', 'Tambor', 'Pandereta', 'Castañuelas', 'Triangulo',
        'Campana', 'Gong', 'Órgano', 'Sintetizador', 'Teclado', 'Theremin'
    ],
    '🚗 Vehículos': [
        'Auto', 'Camión', 'Bus', 'Moto', 'Bicicleta', 'Scooter',
        'Avión', 'Helicóptero', 'Barco', 'Lancha', 'Yate', 'Velero',
        'Submarino', 'Tren', 'Metro', 'Tranvía', 'Camioneta', 'Jeep',
        'SUV', 'Deportivo', 'Taxi', 'Ambulancia', 'Patrulla', 'Bomberos',
        'Grúa', 'Tractor', 'Excavadora', 'Bulldozer', 'Montacargas', 'Karting'
    ],
    '🍎 Frutas': [
        'Manzana', 'Banana', 'Naranja', 'Fresa', 'Uva', 'Sandía',
        'Melón', 'Piña', 'Mango', 'Papaya', 'Kiwi', 'Pera',
        'Durazno', 'Ciruela', 'Cereza', 'Frambuesa', 'Mora', 'Arándano',
        'Limón', 'Lima', 'Mandarina', 'Toronja', 'Granada', 'Higo',
        'Coco', 'Guayaba', 'Maracuyá', 'Lulo', 'Granadilla', 'Pitaya'
    ],
    '🥕 Verduras': [
        'Tomate', 'Lechuga', 'Zanahoria', 'Cebolla', 'Papa', 'Pepino',
        'Brócoli', 'Coliflor', 'Espinaca', 'Acelga', 'Repollo', 'Apio',
        'Pimiento', 'Berenjena', 'Calabaza', 'Zapallo', 'Maíz', 'Ejotes',
        'Arveja', 'Frijol', 'Lenteja', 'Garbanzo', 'Haba', 'Soya',
        'Aguacate', 'Champiñón', 'Ajo', 'Jengibre', 'Rábano', 'Nabo'
    ],
    '⏰ Tiempo': [
        'Segundo', 'Minuto', 'Hora', 'Día', 'Semana', 'Mes',
        'Año', 'Década', 'Siglo', 'Milenio', 'Mañana', 'Tarde',
        'Noche', 'Amanecer', 'Atardecer', 'Mediodía', 'Medianoche', 'Verano',
        'Otoño', 'Invierno', 'Primavera', 'Enero', 'Febrero', 'Marzo',
        'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'
    ]
};

// Funciones de navegación entre pantallas
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
    }, 50);
}

function showStartScreen() {
    gameState = {
        players: [],
        currentPlayerIndex: 0,
        selectedCategory: null,
        secretWord: '',
        impostorIndex: -1,
        roundNumber: 1,
        revealedPlayers: [],
        eliminatedPlayers: [],
        selectedVote: null,
        startingPlayer: -1
    };
    showScreen('startScreen');
}

function showPlayersScreen() {
    showScreen('playersScreen');
}

function showCategoryScreen() {
    if (gameState.players.length < 3) {
        alert('Se necesitan mínimo 3 jugadores');
        return;
    }
    renderCategories();
    showScreen('categoryScreen');
}

// Gestión de jugadores
function addPlayer() {
    const input = document.getElementById('playerNameInput');
    const name = input.value.trim();
    
    if (name === '') {
        alert('Por favor ingresa un nombre');
        return;
    }
    
    if (gameState.players.length >= 12) {
        alert('Máximo 12 jugadores');
        return;
    }
    
    if (gameState.players.includes(name)) {
        alert('Ese nombre ya existe');
        return;
    }
    
    gameState.players.push(name);
    input.value = '';
    renderPlayers();
    updateContinueButton();
}

function removePlayer(index) {
    gameState.players.splice(index, 1);
    renderPlayers();
    updateContinueButton();
}

function renderPlayers() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        playerItem.style.animationDelay = `${index * 0.05}s`;
        playerItem.innerHTML = `
            <div class="player-info">
                <div class="player-number">${index + 1}</div>
                <div class="player-name">${player}</div>
            </div>
            <button class="btn-remove" onclick="removePlayer(${index})">×</button>
        `;
        playersList.appendChild(playerItem);
    });
}

function updateContinueButton() {
    const btn = document.getElementById('continueToCategory');
    btn.disabled = gameState.players.length < 3;
}

// Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('playerNameInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addPlayer();
            }
        });
    }
});

// Gestión de categorías
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';
    
    Object.keys(categories).forEach((category, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        const [icon, name] = category.split(' ');
        card.innerHTML = `
            <div class="category-icon">${icon}</div>
            <div class="category-name">${name}</div>
        `;
        
        card.onclick = () => selectCategory(category, card);
        grid.appendChild(card);
    });
}

function selectCategory(category, cardElement) {
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    cardElement.classList.add('selected');
    gameState.selectedCategory = category;
    document.getElementById('startGameBtn').disabled = false;
}

// Iniciar juego
function startGame() {
    if (!gameState.selectedCategory) {
        alert('Selecciona una categoría');
        return;
    }
    
    const words = categories[gameState.selectedCategory];
    gameState.secretWord = words[Math.floor(Math.random() * words.length)];
    gameState.impostorIndex = Math.floor(Math.random() * gameState.players.length);
    gameState.startingPlayer = Math.floor(Math.random() * gameState.players.length);
    gameState.currentPlayerIndex = 0;
    gameState.revealedPlayers = [];
    gameState.eliminatedPlayers = [];
    
    showRoleReveal();
}

// Revelación de roles
function showRoleReveal() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    document.getElementById('currentPlayerName').textContent = currentPlayer;
    
    const card = document.getElementById('revealCard');
    card.classList.remove('flipped');
    
    document.getElementById('nextPlayerBtn').style.display = 'none';
    document.getElementById('startRoundBtn').style.display = 'none';
    
    showScreen('roleRevealScreen');
}

function revealRole() {
    const card = document.getElementById('revealCard');
    if (card.classList.contains('flipped')) return;
    
    card.classList.add('flipped');
    
    const cardBack = document.getElementById('cardBack');
    const isImpostor = gameState.currentPlayerIndex === gameState.impostorIndex;
    
    if (isImpostor) {
        cardBack.className = 'card-back impostor';
        cardBack.innerHTML = `
            <div class="role-label">Tu rol</div>
            <div class="secret-word">🎭 IMPOSTOR</div>
            <div class="role-description">
                No conoces la palabra secreta.<br>
                Debes fingir que la conoces y descubrirla sin ser atrapado.
            </div>
        `;
    } else {
        cardBack.className = 'card-back civilian';
        cardBack.innerHTML = `
            <div class="role-label">Palabra Secreta</div>
            <div class="secret-word">${gameState.secretWord}</div>
            <div class="role-description">
                Eres un civil.<br>
                Da pistas para demostrar que conoces la palabra sin revelarla.
            </div>
        `;
    }
    
    gameState.revealedPlayers.push(gameState.currentPlayerIndex);
    
    if (gameState.revealedPlayers.length < gameState.players.length) {
        setTimeout(() => {
            document.getElementById('nextPlayerBtn').style.display = 'block';
        }, 800);
    } else {
        setTimeout(() => {
            document.getElementById('startRoundBtn').style.display = 'block';
        }, 800);
    }
}

function nextPlayer() {
    gameState.currentPlayerIndex++;
    showRoleReveal();
}

function startRound() {
    updateGameScreen();
    showScreen('gameScreen');
}

// Pantalla de juego
function updateGameScreen() {
    document.getElementById('roundNumber').textContent = gameState.roundNumber;
    
    const alivePlayers = gameState.players.filter((_, index) => 
        !gameState.eliminatedPlayers.includes(index)
    );
    document.getElementById('aliveCount').textContent = alivePlayers.length;
    
    const startingPlayerName = gameState.players[gameState.startingPlayer];
    document.getElementById('currentTurn').textContent = startingPlayerName;
}

// Votación
function showVoting() {
    renderVotingGrid();
    showScreen('votingScreen');
}

function renderVotingGrid() {
    const grid = document.getElementById('votingGrid');
    grid.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const isEliminated = gameState.eliminatedPlayers.includes(index);
        
        const card = document.createElement('div');
        card.className = 'vote-card';
        if (isEliminated) card.classList.add('eliminated');
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="vote-avatar">${player.charAt(0).toUpperCase()}</div>
            <div class="vote-name">${player}</div>
        `;
        
        if (!isEliminated) {
            card.onclick = () => selectVote(index, card);
        }
        
        grid.appendChild(card);
    });
}

function selectVote(playerIndex, cardElement) {
    document.querySelectorAll('.vote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    cardElement.classList.add('selected');
    gameState.selectedVote = playerIndex;
    document.getElementById('confirmVoteBtn').disabled = false;
}

function confirmVote() {
    if (gameState.selectedVote === null) return;
    
    const votedPlayerIndex = gameState.selectedVote;
    const votedPlayer = gameState.players[votedPlayerIndex];
    const isImpostor = votedPlayerIndex === gameState.impostorIndex;
    
    gameState.eliminatedPlayers.push(votedPlayerIndex);
    
    const alivePlayers = gameState.players.filter((_, index) => 
        !gameState.eliminatedPlayers.includes(index)
    );
    
    const shouldRevealImpostor = alivePlayers.length === 2 && !isImpostor;
    
    showResult(isImpostor, votedPlayer, shouldRevealImpostor);
}

// Resultado
function showResult(wasImpostor, votedPlayer, revealImpostor = false) {
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultDetails = document.getElementById('resultDetails');
    const continueBtn = document.getElementById('continueGameBtn');
    
    if (wasImpostor) {
        resultIcon.textContent = '🎉';
        resultTitle.textContent = '¡Civiles Ganan!';
        resultTitle.className = 'result-title win';
        resultMessage.textContent = `¡Atraparon al impostor! ${votedPlayer} era el impostor.`;
        resultDetails.innerHTML = `
            <div class="secret-word-reveal">La palabra secreta era:</div>
            <div class="secret-word-big">${gameState.secretWord}</div>
        `;
        continueBtn.style.display = 'none';
    } else {
        const alivePlayers = gameState.players.filter((_, index) => 
            !gameState.eliminatedPlayers.includes(index)
        );
        
        if (revealImpostor) {
            const impostorName = gameState.players[gameState.impostorIndex];
            resultIcon.textContent = '🎭';
            resultTitle.textContent = '¡El Impostor Gana!';
            resultTitle.className = 'result-title lose';
            resultMessage.textContent = `¡${votedPlayer} era un civil! El impostor sobrevivió hasta el final.`;
            resultDetails.innerHTML = `
                <div class="impostor-reveal">El impostor era:</div>
                <div class="impostor-name">${impostorName}</div>
                <div class="secret-word-reveal" style="margin-top: 16px;">La palabra secreta era:</div>
                <div class="secret-word-big">${gameState.secretWord}</div>
            `;
            continueBtn.style.display = 'none';
        } else if (alivePlayers.length === 1) {
            const impostorName = gameState.players[gameState.impostorIndex];
            resultIcon.textContent = '🎭';
            resultTitle.textContent = '¡El Impostor Gana!';
            resultTitle.className = 'result-title lose';
            resultMessage.textContent = `¡El impostor eliminó a todos los civiles!`;
            resultDetails.innerHTML = `
                <div class="impostor-reveal">El impostor era:</div>
                <div class="impostor-name">${impostorName}</div>
                <div class="secret-word-reveal" style="margin-top: 16px;">La palabra secreta era:</div>
                <div class="secret-word-big">${gameState.secretWord}</div>
            `;
            continueBtn.style.display = 'none';
        } else {
            resultIcon.textContent = '❌';
            resultTitle.textContent = 'No era el impostor';
            resultTitle.className = 'result-title';
            resultMessage.textContent = `${votedPlayer} era un civil. El juego continúa...`;
            resultDetails.innerHTML = `
                <div class="players-alive">${alivePlayers.length} jugadores quedan en el juego</div>
            `;
            continueBtn.style.display = 'block';
        }
    }
    
    gameState.selectedVote = null;
    showScreen('resultScreen');
}

function continueGame() {
    gameState.roundNumber++;
    
    const aliveIndices = gameState.players
        .map((_, index) => index)
        .filter(index => !gameState.eliminatedPlayers.includes(index));
    
    gameState.startingPlayer = aliveIndices[Math.floor(Math.random() * aliveIndices.length)];
    
    updateGameScreen();
    showScreen('gameScreen');
}