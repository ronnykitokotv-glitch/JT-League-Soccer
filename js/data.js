// Données des ligues, équipes et joueurs
// La RDC est intégrée avec une note de 4,5 étoiles

const LEAGUES = {
  rdc: {
    id: "rdc",
    name: "Linafoot",
    country: "RDC",
    flag: "🇨🇩",
    stars: 4.5,
    teams: [
      {
        id: "tp_mazembe",
        name: "TP Mazembe",
        stars: 4.5,
        colors: { primary: "#0033A0", secondary: "#FFFFFF", skin: "#5C3A21" },
        players: [
          { name: "M. Kabasele", position: "ATT", attack: 85, defense: 60, midfield: 78 },
          { name: "J. Mumbere", position: "MIL", attack: 75, defense: 70, midfield: 84 },
          { name: "C. Kalala", position: "DEF", attack: 55, defense: 87, midfield: 68 },
          { name: "P. Mwamba", position: "ATT", attack: 81, defense: 58, midfield: 74 }
        ]
      },
      {
        id: "as_vita",
        name: "AS Vita Club",
        stars: 4.5,
        colors: { primary: "#FFD700", secondary: "#000000", skin: "#4A2C17" },
        players: [
          { name: "R. Ngoy", position: "ATT", attack: 83, defense: 62, midfield: 76 },
          { name: "F. Mukendi", position: "MIL", attack: 72, defense: 72, midfield: 82 },
          { name: "B. Lukaku", position: "DEF", attack: 52, defense: 85, midfield: 66 },
          { name: "S. Kembo", position: "ATT", attack: 79, defense: 57, midfield: 73 }
        ]
      },
      {
        id: "lupopo",
        name: "FC Saint-Éloi Lupopo",
        stars: 4,
        colors: { primary: "#008000", secondary: "#FFFFFF", skin: "#5C3A21" },
        players: [
          { name: "T. Ilunga", position: "ATT", attack: 78, defense: 60, midfield: 74 },
          { name: "K. Mbuyi", position: "MIL", attack: 70, defense: 68, midfield: 79 }
        ]
      },
      {
        id: "dcmp",
        name: "DC Motema Pembe",
        stars: 4,
        colors: { primary: "#FF0000", secondary: "#FFFFFF", skin: "#4A2C17" },
        players: [
          { name: "L. Nsimba", position: "ATT", attack: 76, defense: 58, midfield: 72 },
          { name: "A. Bemba", position: "DEF", attack: 50, defense: 82, midfield: 64 }
        ]
      }
    ]
  },

  eng: {
    id: "eng",
    name: "Premier League",
    country: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    stars: 5,
    teams: [
      {
        id: "man_city",
        name: "Manchester City",
        stars: 5,
        colors: { primary: "#6CABDD", secondary: "#FFFFFF", skin: "#F1C27D" },
        players: [
          { name: "Haaland", position: "ATT", attack: 94, defense: 45, midfield: 68 },
          { name: "De Bruyne", position: "MIL", attack: 88, defense: 60, midfield: 92 },
          { name: "Dias", position: "DEF", attack: 55, defense: 91, midfield: 74 }
        ]
      }
    ]
  },

  fra: {
    id: "fra",
    name: "Ligue 1",
    country: "France",
    flag: "🇫🇷",
    stars: 4.5,
    teams: [
      {
        id: "psg",
        name: "Paris SG",
        stars: 5,
        colors: { primary: "#004170", secondary: "#DA291C", skin: "#F1C27D" },
        players: [
          { name: "Mbappé", position: "ATT", attack: 93, defense: 40, midfield: 78 },
          { name: "Verratti", position: "MIL", attack: 70, defense: 74, midfield: 88 },
          { name: "Marquinhos", position: "DEF", attack: 60, defense: 88, midfield: 76 }
        ]
      }
    ]
  },

  esp: {
    id: "esp",
    name: "La Liga",
    country: "Espagne",
    flag: "🇪🇸",
    stars: 5,
    teams: [
      {
        id: "real_madrid",
        name: "Real Madrid",
        stars: 5,
        colors: { primary: "#FFFFFF", secondary: "#FEBE10", skin: "#F1C27D" },
        players: [
          { name: "Vinícius Jr", position: "ATT", attack: 91, defense: 35, midfield: 80 },
          { name: "Modric", position: "MIL", attack: 78, defense: 65, midfield: 90 },
          { name: "Rüdiger", position: "DEF", attack: 50, defense: 89, midfield: 70 }
        ]
      }
    ]
  }
};

// Export global (pas de module pour simplifier)
window.LEAGUES = LEAGUES;
