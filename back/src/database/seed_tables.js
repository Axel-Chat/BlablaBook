import { sequelize, Author, Book, Category, User } from "../models/associations.js";

async function seedDatabase() {
  try {
    console.log("---");

    // sync models with database
    await sequelize.sync({ force: true });
    console.log("Base de donnée synchronisée ✅");
    console.log("Data inserted:");

    // create catégories
    const categoryData = [
      { name: "Romance" },
      { name: "Thriller" },
      { name: "Fantasy" },
      { name: "Science-fiction" },
      { name: "Développement personnel" },
      { name: "Biographie" },
      { name: "Jeunesse" },
      { name: "Manga" },
      { name: "Bande dessinée" },
      { name: "Classique" },
    ];

    const categories = await Category.bulkCreate(categoryData);
    console.log(categoryData.length, "Categories ");

    // create authors

    const authorData = [
      // Romance
      { name: "Anna Todd" },
      { name: "Colleen Hoover" },
      { name: "John Green" },
      { name: "Jane Austen" },
      { name: "Stephenie Meyer" },
      { name: "Jojo Moyes" },
      { name: "Ali Hazelwood" },

      // Thriller
      { name: "Joël Dicker" },
      { name: "Donato Carrisi" },
      { name: "Gillian Flynn" },
      { name: "Jean-Christophe Grangé" },
      { name: "Dennis Lehane" },
      { name: "Agatha Christie" },
      { name: "Paula Hawkins" },

      // Fantasy
      { name: "J.K. Rowling" },
      { name: "J.R.R. Tolkien" },
      { name: "Christelle Dabos" },
      { name: "Robin Hobb" },
      { name: "Christopher Paolini" },
      { name: "George R.R. Martin" },
      { name: "Leigh Bardugo" },

      // Science-fiction
      { name: "Frank Herbert" },
      { name: "Isaac Asimov" },
      { name: "Andy Weir" },
      { name: "William Gibson" },
      { name: "Margaret Atwood" },
      { name: "Dan Simmons" },

      // Développement personnel
      { name: "Don Miguel Ruiz" },
      { name: "James Clear" },
      { name: "Eckhart Tolle" },
      { name: "Raphaëlle Giordano" },
      { name: "Hal Elrod" },
      { name: "Mark Manson" },

      // Biographie
      { name: "Michelle Obama" },
      { name: "Walter Isaacson" },
      { name: "Simone Veil" },
      { name: "Nelson Mandela" },
      { name: "Malala Yousafzai" },
      { name: "Philippe Lançon" },

      // Jeunesse
      { name: "Suzanne Collins" },
      { name: "Rick Riordan" },
      { name: "Alice Oseman" },
      { name: "Erin Hunter" },
      { name: "Tui T. Sutherland" },
      { name: "Antoine de Saint-Exupéry" },
      { name: "Bertrand Santini" },

      // Mangas
      { name: "Kanehito Yamada" },
      { name: "Tsukasa Abe" },
      { name: "Natsu Hyuuga" },
      { name: "Itsuki Nanao" },
      { name: "Nekokurage" },
      { name: "Touco Shino" },
      { name: "Koyoharu Gotōge" },
      { name: "Gege Akutami" },
      { name: "Masashi Kishimoto" },
      { name: "Tsugumi Ohba" },
      { name: "Takeshi Obata" },
      { name: "Kohei Horikoshi" },
      { name: "Tatsuya Endo" },
      { name: "Chugong" },

      // Bande dessinée
      { name: "Felix Delep" },
      { name: "Xavier Dorison" },
      { name: "Jessica Bodard" },
      { name: "Hergé" },
      { name: "René Goscinny" },
      { name: "Albert Uderzo" },
      { name: "Wilfrid Lupano" },
      { name: "Paul Cauuet" },

      // Classique
      { name: "Victor Hugo" },
      { name: "Alexandre Dumas" },
      { name: "Herman Melville" },
      { name: "Mary Shelley" },
      { name: "Bram Stoker" },
      { name: "Arthur Conan Doyle" },
    ];

    const authors = await Author.bulkCreate(authorData);
    console.log(authorData.length, "Auteurs ");

    // create books

    const bookData = [
      {
        isbn: "9782253194583",
        title: "After - Tome 1",
        description:
          "After raconte l'histoire de Tessa Young, une étudiante sérieuse qui tombe amoureuse de Hardin Scott, un jeune homme impulsif. Leur relation passionnée les entraîne dans des montagnes russes émotionnelles, entre amour, colère, réconciliation et trahison.",
        published: "2016",
        cover_url: "1459864478i/29781320",
        page_count: 816,
      },
      {
        isbn: "9781501110368",
        title: "It Ends With Us",
        description:
          "Lily Bloom, une jeune femme qui a grandi dans un environnement difficile, rencontre Ryle Kincaid, un chirurgien ambitieux. Leur relation tumultueuse la confronte à ses propres choix entre l'amour et la sécurité.",
        published: "2016",
        cover_url: "1725582473i/218517898",
        page_count: 384,
      },
      {
        isbn: "9782092543030",
        title: "Nos étoiles contraires",
        description:
          "L'histoire poignante de deux adolescents, Hazel et Gus, qui luttent contre le cancer. Ils vivent une histoire d'amour extraordinaire, malgré la souffrance, et découvrent l'impact profond qu'ils ont l'un sur l'autre.",
        published: "2013",
        cover_url: "1354914714i/16176099",
        page_count: 336,
      },
      {
        isbn: "9782080460110",
        title: "Orgueil et Préjugés",
        description:
          "Elizabeth Bennet, l'héroïne du roman, lutte contre ses sentiments pour le riche et hautain Mr. Darcy. Ce classique explore les thèmes de l'amour, de la classe sociale et des malentendus.",
        published: "2024",
        cover_url: "1730186529i/216428118",
        page_count: 432,
      },
      {
        isbn: "9780316015844",
        title: "Twilight",
        description:
          "Bella Swan, une adolescente ordinaire, tombe amoureuse de Edward Cullen, un vampire. Leur amour interdit fait face à de nombreux obstacles, notamment les dangers liés à la nature de Edward.",
        published: "2006",
        cover_url: "1700522826i/41865",
        page_count: 544,
      },
      {
        isbn: "9782811210014",
        title: "Avant toi",
        description:
          "Alors que sa famille traverse des heures sombres et que tous les espoirs reposent sur elle, Lou, 26 ans, perd son travail. Pour retrouver un emploi, elle est prête à tout, ou presque : elle ne sera ni strip-teaseuse ni garde-malade. Elle finit par accepter un contrat de six mois pour tenir compagnie à un jeune tétraplégique. Malgré l'accueil glacial qu'il lui réserve, Lou va découvrir en Will un homme exceptionnel, brillant dans les affaires, accro aux sensations fortes et voyageur invétéré. Mais depuis son accident, il veut mettre fin à ses jours. Lou n'a que quelques mois pour le faire changer d'avis.",
        published: "2013",
        cover_url: "1359004687i/17281930",
        page_count: 480,
      },
      {
        isbn: "9782381222738",
        title: "The Love Hypothesis",
        description:
          "Olive Smith, une doctorante en biologie, se lance dans une fausse relation avec Adam Carlsen, un professeur. Alors qu'ils feignent l'amour, des sentiments réels commencent à émerger, chamboulant leurs vies et leurs carrières.",
        published: "2022",
        cover_url: "1663504369i/61313872",
        page_count: 480,
      },
      {
        isbn: "9782889730087",
        title: "La Vérité sur l'affaire Harry Quebert",
        description:
          "Un jeune écrivain, Marcus Goldman, enquête sur son mentor Harry Quebert, accusé du meurtre d'une adolescente. Le livre explore le monde de la littérature et des secrets du passé.",
        published: "2022",
        cover_url: "1647372117i/60624997",
        page_count: 863,
      },
      {
        isbn: "9782253157205",
        title: "Le Chuchoteur",
        description:
          "Un tueur en série sévit en Italie, et un inspecteur est appelé pour résoudre le mystère. Le thriller plonge dans l'âme humaine, entre douleur et manipulations.",
        published: "2011",
        cover_url: "1351170620i/11038480",
        page_count: 576,
      },
      {
        isbn: "9780753827666",
        title: "Gone Girl",
        description:
          "Amy disparaît mystérieusement le jour de son anniversaire, et son mari Nick devient le principal suspect. Un jeu de manipulation, mensonges et retournements de situation plonge les lecteurs dans une spirale d'incertitude.",
        published: "2013",
        cover_url: "1636561575i/59586576",
        page_count: 528,
      },
      {
        isbn: "9782253171676",
        title: "Les Rivières Pourpres",
        description:
          "L'inspecteur Pierre Niémans et la jeune détective Camille Delaunay enquêtent sur une série de meurtres dans une petite ville. Ce roman mêle crime, mystère et secrets enfouis.",
        published: "2001",
        cover_url: "1344861788i/15826126",
        page_count: 448,
      },
      {
        isbn: "9782743659769",
        title: "Shutter Island",
        description:
          "Teddy Daniels, un détective, enquête sur la disparition d'une patiente d'un hôpital psychiatrique situé sur une île isolée. Au fur et à mesure de son enquête, il se rend compte que les choses ne sont pas ce qu'elles semblent être.",
        published: "2023",
        cover_url: "1680719721i/125315964",
        page_count: 400,
      },
      {
        isbn: "9782351052204",
        title: "Le Crime de l'Orient-Express",
        description:
          "Le détective Hercule Poirot résout un meurtre à bord de l'Orient-Express, où chaque passager pourrait être un suspect. Un classique du genre, où l'ingéniosité du détective est mise à l'épreuve.",
        published: "2023",
        cover_url: "1719700134i/198342656",
        page_count: 160,
      },
      {
        isbn: "9782266254489",
        title: "La Fille du train",
        description:
          "Rachel, une femme alcoolique, se retrouve mêlée à la disparition d'une femme qu'elle observait tous les jours depuis le train. Un thriller psychologique captivant où le passé et la réalité se mélangent.",
        published: "2016",
        cover_url: "1469737918i/31285614",
        page_count: 464,
      },
      {
        isbn: "9782070585205",
        title: "Harry Potter – Tome 4 : Harry Potter et la Coupe de Feu",
        description:
          "Harry participe au Tournoi des Trois Sorciers, une compétition magique qui met ses capacités à l'épreuve. Ce tome voit son monde s'assombrir, alors qu'il fait face à des épreuves dangereuses et à de nouveaux défis. C'est un tournant majeur dans la saga.",
        published: "2017",
        cover_url: "1508475182i/36444262",
        page_count: 784,
      },
      {
        isbn: "9782267046892",
        title: "Le Seigneur des Anneaux – Tome 2 : Les Deux Tours",
        description:
          "Frodon et Sam continuent leur périple vers le Mordor. Tandis que la Communauté est dispersée, Aragorn et ses compagnons affrontent de nouveaux ennemis et se battent pour la survie du monde libre. Le mal se renforce et les enjeux deviennent de plus en plus graves.",
        published: "2022",
        cover_url: "1659718003i/61867641",
        page_count: 432,
      },
      {
        isbn: "9782075120951",
        title: "La Passe-miroir – Tome 3 : La Mémoire de Babel",
        description:
          "Ophélie, partie en quête de Thorn, se rend dans l'arche de Babel, un endroit mystérieux et élitiste. Entre intrigues politiques et mystères à résoudre, elle découvre des secrets qui pourraient changer son univers à jamais.",
        published: "2019",
        cover_url: "1558645732i/46000950",
        page_count: 566,
      },
      {
        isbn: "9782290383315",
        title: "L'Assassin royal – Tome 6 : La Reine solitaire",
        description:
          "FitzChevalerie, exilé et caché sous une nouvelle identité, est forcé de revenir à la cour pour protéger la famille royale. Ses relations et son passé le rattrapent, et des secrets anciens refont surface. L'intrigue se centre sur ses dilemmes internes et les enjeux politiques autour de la cour royale.",
        published: "2023",
        cover_url: "1680726932i/125387537",
        page_count: 384,
      },
      {
        isbn: "9791036313714",
        title: "Eragon – Tome 2 : L'Aîné",
        description:
          "Eragon poursuit son apprentissage en tant que Dragonnier, se rendant dans une lointaine cité pour parfaire ses compétences. Pendant ce temps, une guerre éclate et les secrets des dragonniers refont surface. Ce tome suit son évolution en tant que héros et son exploration de son propre destin.",
        published: "2019",
        cover_url: "1579366189i/50534386",
        page_count: 808,
      },
      {
        isbn: "9782290319956",
        title: "Le Trône de Fer – Tome 5 : L'Invincible Forteresse",
        description:
          "Dans un monde où le pouvoir change de mains, ce tome explore les luttes politiques intenses après un grand bouleversement. De nouveaux défis et trahisons surgissent, et les protagonistes se battent pour garder leur place dans un jeu de pouvoir impitoyable.",
        published: "2002",
        cover_url: "1330189403i/2072931",
        page_count: 352,
      },
      {
        isbn: "9782016265376",
        title: "Six of Crows – Tome 1 : Six of Crows",
        description:
          "Kaz Brekker, un criminel brillant, forme une équipe d'individus aux talents exceptionnels pour réaliser un casse impossible. Ce groupe improbable s'attaque à un défi dangereux et découvre qu'ils devront se confronter à plus que de simples obstacles physiques.",
        published: "2017",
        cover_url: "1556826594i/45440651",
        page_count: 576,
      },
      {
        isbn: "9782266320481",
        title: "Dune – Tome 1 : Dune",
        description:
          "Sur la planète Arrakis, la lutte pour le contrôle de l'épice, une substance précieuse, est au cœur de l'intrigue. Paul Atreides, héritier de la maison noble des Atreides, devra naviguer dans des complots politiques, des guerres et des révélations mystiques.",
        published: "2021",
        cover_url: "1631544792i/58989059",
        page_count: 936,
      },
      {
        isbn: "9782070360536",
        title: "Fondation – Tome 1 : Le cycle de Fondation",
        description:
          "La Fondation est une organisation scientifique fondée pour préserver les connaissances humaines dans un futur galactique. L'histoire suit des personnages clés qui luttent contre la chute imminente de l'Empire Galactique.",
        published: "2009",
        cover_url: "1462877032i/26073740",
        page_count: 416,
      },
      {
        isbn: "9782811215729",
        title: "Seul sur Mars",
        description:
          "Mark Watney, un astronaute laissé pour mort sur Mars après un accident, utilise son ingéniosité pour survivre en attendant un sauvetage. Un récit de survie intense, alliant science et humour.",
        published: "2015",
        cover_url: "1447332097i/27810119",
        page_count: 480,
      },
      {
        isbn: "9791030703658",
        title: "Neuromancien",
        description:
          "Case, un pirate informatique, est engagé pour effectuer un vol virtuel dans un monde cybernétique. Le roman explore des thèmes de réalité virtuelle, d'intelligence artificielle et d'intrigues technologiques.",
        published: "2020",
        cover_url: "1603108626i/55725587",
        page_count: 438,
      },
      {
        isbn: "9782221249949",
        title: "La Servante écarlate",
        description:
          "Dans un futur dystopique, les femmes sont réduites à des rôles subordonnés dans une société totalitaire. Offred, l'héroïne, est une servante dont la seule fonction est de procréer pour les élites dirigeantes. Un puissant récit de résistance et de liberté.",
        published: "2021",
        cover_url: "1672941418i/56982509",
        page_count: 560,
      },
      {
        isbn: "9782266252584",
        title: "Hypérion",
        description:
          "Un groupe de pèlerins se rend sur la planète Hypérion, chacun ayant une histoire personnelle à raconter. Un mélange de récits et d'aventures dans un futur lointain où l'humanité est confrontée à des forces mystérieuses.",
        published: "2014",
        cover_url: "1415797952i/23548915",
        page_count: 640,
      },
      {
        isbn: "9782290342480",
        title: "Le cycle des robots - Tome 1 : les robots",
        description:
          "Dans le futur, les robots sont devenus progressivement indispensables à l'homme, en étant toujours plus sophistiqués, plus puissants - mais aussi, parfois, plus dangereux. Heureusement, les humains sont bien protégés par la première loi, qui rend les androïdes inoffensifs. Mais qu'adviendra-t-il si son interprétation était biaisée ? Et si des machines s'imposaient à des postes clés de notre société ? Et si les robots venaient à diriger le monde ?",
        published: "2004",
        cover_url: "1611401044i/56790999",
        page_count: 320,
      },
      {
        isbn: "9782883534612",
        title: "Les Quatre Accords Toltèques",
        description:
          "Ce livre propose quatre principes simples mais puissants pour mener une vie plus heureuse et épanouie : ne pas prendre les choses personnellement, ne pas faire de suppositions, toujours faire de son mieux et être impeccable avec ses mots.",
        published: "2005",
        cover_url: "1182507457i/1285456",
        page_count: 125,
      },
      {
        isbn: "9782035969200",
        title: "Un rien peut tout changer !",
        description:
          "James Clear propose une méthode pour créer de petites habitudes positives qui peuvent avoir un impact énorme sur la vie. Il explore la science derrière les habitudes et comment les modifier pour améliorer notre quotidien.",
        published: "2019",
        cover_url: "1566852995l/52678497",
        page_count: 320,
      },
      {
        isbn: "9782290020203",
        title: "Le Pouvoir du moment présent",
        description:
          "Un guide spirituel qui encourage à vivre dans l'instant présent et à se détacher des pensées négatives. Tolle invite à trouver la paix intérieure en se libérant de l'ego et des préoccupations de l'esprit.",
        published: "2010",
        cover_url: "1328402604i/10370389",
        page_count: 256,
      },
      {
        isbn: "9782416014291",
        title: "Ta deuxième vie commence quand tu comprends que tu n'en as qu'une",
        description:
          'Ce livre raconte l\'histoire de Camille, une femme qui traverse une crise de la quarantaine et qui décide de réinventer sa vie grâce à un "coach de vie". Une approche simple et bienveillante pour retrouver sa joie de vivre.',
        published: "2024",
        cover_url: "1719702777i/198823285",
        page_count: 304,
      },
      {
        isbn: "9782266268554",
        title: "Miracle Morning",
        description:
          "Hal Elrod propose une routine matinale de 6 pratiques simples à intégrer dès le matin pour transformer sa vie. Le livre encourage à commencer chaque journée avec des habitudes saines qui ont un impact positif sur toute la journée.",
        published: "2017",
        cover_url: "1513629747i/37563551",
        page_count: 272,
      },
      {
        isbn: "9782212567595",
        title: "L'art subtil de s'en foutre",
        description:
          "Un livre de développement personnel qui renverse les conventions habituelles. Mark Manson prône une approche plus réaliste du bonheur, en se concentrant sur les choses qui comptent vraiment et en abandonnant la quête d'une vie parfaite.",
        published: "2017",
        cover_url: "1533568095i/41057918",
        page_count: 188,
      },

      {
        isbn: "9782016284926",
        title: "Devenir",
        description:
          "Les mémoires de l'ex-Première Dame des États-Unis, Michelle Obama, qui raconte son enfance, son parcours à la Maison Blanche, et ses réflexions sur la politique, la famille et la race. Un témoignage émouvant et inspirant.",
        published: "2021",
        cover_url: "1632514726i/59069328",
        page_count: 512,
      },
      {
        isbn: "9782709638326",
        title: "Steve Jobs",
        description:
          "Une biographie complète du co-fondateur d'Apple, Steve Jobs, qui explore sa vie, ses créations révolutionnaires et son caractère complexe. Le livre dévoile des aspects personnels de Jobs, ainsi que sa vision du monde technologique.",
        published: "2011",
        cover_url: "1348825606i/12808064",
        page_count: 668,
      },
      {
        isbn: "9782253127765",
        title: "Une vie",
        description:
          "Les mémoires de Simone Veil, figure emblématique de la lutte pour les droits des femmes et la justice sociale en France. Son récit retrace son parcours, de la déportation à Auschwitz à son engagement pour la légalisation de l'avortement.",
        published: "2009",
        cover_url: "1328373264i/7952689",
        page_count: 352,
      },
      {
        isbn: "9782253140634",
        title: "Un long chemin vers la liberté",
        description:
          "Les mémoires de Nelson Mandela, leader de la lutte contre l'apartheid en Afrique du Sud, détaillant son parcours depuis son enfance jusqu'à son emprisonnement et son ascension politique. Un témoignage puissant sur la résistance et l'espoir.",
        published: "1996",
        cover_url: "1347380655i/1740591",
        page_count: 768,
      },
      {
        isbn: "9782013193184",
        title: "Moi, Malala",
        description:
          "L'histoire de Malala Yousafzai, la plus jeune lauréate du prix Nobel de la paix, qui raconte son combat pour l'éducation des filles au Pakistan et son attaque par les talibans, suivie de sa résilience et de sa voix mondiale.",
        published: "2016",
        cover_url: "1453908068i/28780030",
        page_count: 320,
      },
      {
        isbn: "9782072873706",
        title: "Le Lambeau",
        description:
          "Un témoignage poignant de Philippe Lançon, victime de l'attentat contre Charlie Hebdo en 2015, qui raconte son combat pour survivre et se reconstruire après les blessures physiques et psychologiques.",
        published: "2020",
        cover_url: "1578405275i/50348311",
        page_count: 512,
      },
      {
        isbn: "9782266260787",
        title: "Hunger Games - Tome 2 : L'embrasement",
        description:
          "Dans un futur dystopique, Katniss Everdeen, une jeune fille, doit participer à un combat à mort télévisé avec d'autres enfants pour divertir les élites. Un récit de survie, de rébellion et de résistance.",
        published: "2015",
        cover_url: "1451581575i/28415052",
        page_count: 432,
      },
      {
        isbn: "9782019109974",
        title: "Percy Jackson - Tome 3 : Le sort Du Titan",
        description:
          "Percy Jackson, un adolescent, découvre qu'il est un demi-dieu, fils de Poséidon, et doit partir en quête pour récupérer l'éclair de Zeus. Le livre mélange mythologie grecque et aventures modernes dans un style captivant et plein d'humour.",
        published: "2016",
        cover_url: "1524087196i/33167226",
        page_count: 384,
      },
      {
        isbn: "9782017108313",
        title: "Heartstopper - Tome 1 : Deux garçons. Une Rencontre",
        description:
          "L'histoire d'amour touchante entre Nick et Charlie, deux adolescents qui se rencontrent au lycée. Une bande dessinée émouvante qui explore l'amitié, l'acceptation de soi et les premiers amours.",
        published: "2019",
        cover_url: "1570545397l/52649092",
        page_count: 272,
      },
      {
        isbn: "9782266178921",
        title: "La Guerre des clan - Tome 3 : Les mystères de la forêt",
        description:
          "Ce livre raconte les aventures de différents clans de chats sauvages qui luttent pour leur survie dans la forêt. Chaque chat a son rôle et ses croyances, créant un monde complexe et fascinant.",
        published: "2008",
        cover_url: "1348944190i/6470103",
        page_count: 319,
      },
      {
        isbn: "9782070661831",
        title: "Les Royaumes de Feu - Tome 1 : La Prophétie",
        description:
          "L'histoire suit cinq dragons qui se battent pour mettre fin à une guerre sanglante entre les tribus de dragons. Chaque personnage apporte une perspective différente sur la guerre et la rédemption.",
        published: "2015",
        cover_url: "1424697774i/25001418",
        page_count: 383,
      },
      {
        isbn: "9782070612758",
        title: "Le Petit Prince",
        description:
          "Un pilote se retrouve coincé dans le désert du Sahara, où il rencontre un petit prince venu d'une autre planète. Un conte philosophique qui aborde l'amitié, l'amour, la perte et la recherche de sens dans la vie.",
        published: "2007",
        cover_url: "1566560677i/832605",
        page_count: 120,
      },
      {
        isbn: "9782848657899",
        title: "Le Journal de Gurty - Tome 1 : Vacances en Provences",
        description:
          "Gurty, un chien adorable mais un peu maladroit, raconte ses aventures et ses réflexions dans son journal. Une série pleine de charme et d'humour, idéale pour les jeunes lecteurs.",
        published: "2015",
        cover_url: "1430339064i/25452511",
        page_count: 140,
      },
      {
        isbn: "9791032711262",
        title: "Frieren : Beyond Journey's End - Tome 4",
        description:
          "Frieren continue son voyage après la fin de la quête des héros. Ce tome se concentre sur la découverte de nouvelles régions et sur les rencontres avec des personnages qui vont remettre en question sa vision du monde et du passage du temps.",
        published: "2022",
        cover_url: "1657191679i/61405470",
        page_count: 176,
      },
      {
        isbn: "9791032710265",
        title: "Les Carnets de l'Apothicaire - Tome 6",
        description:
          "Maomao est toujours en mission au palais impérial, où elle continue d'utiliser son intelligence pour résoudre des mystères liés aux poisons et à la politique complexe qui règne dans l'empire. Ce tome approfondit les intrigues et les relations entre les personnages.",
        published: "2021",
        cover_url: "1636297509i/59539064",
        page_count: 173,
      },
      {
        isbn: "9782809487206",
        title: "Demon Slayer - Tome 8",
        description:
          "Tanjiro et ses compagnons affrontent des démons de plus en plus puissants dans leur quête pour sauver l'humanité. Ce tome met en avant des combats intenses et des moments de développement des personnages, tout en explorant les défis émotionnels qu'ils rencontrent.",
        published: "2020",
        cover_url: "1595186624i/54594742",
        page_count: 192,
      },
      {
        isbn: "9791032710944",
        title: "Jujutsu Kaisen - Tome 13",
        description:
          "L'arc de Shibuya entre dans une nouvelle phase de confrontation où des alliances et des stratégies se forment face à des ennemis redoutables. Ce tome se concentre sur les luttes internes des personnages et les répercussions de leurs choix dans un monde dévasté par les malédictions.",
        published: "2022",
        cover_url: "1644868330i/60405543",
        page_count: 188,
      },
      {
        isbn: "9782871299110",
        title: "Naruto - Tome 22",
        description:
          "Le conflit contre l'Akatsuki devient plus intense, et Naruto, Sasuke et leurs alliés se retrouvent confrontés à des menaces qui mettront à l'épreuve leur loyauté et leur détermination. Ce tome prépare le terrain pour des révélations majeures et des changements de direction dans l'histoire.",
        published: "2006",
        cover_url: "1375474531i/2506078",
        page_count: 192,
      },
      {
        isbn: "9782505001997",
        title: "Death Note - Tome 7",
        description:
          "Light Yagami et L continuent leur affrontement psychologique à un niveau plus intense. Ce tome explore l'évolution de leurs stratégies respectives, tandis que les enjeux pour chaque personnage montent en flèche.",
        published: "2007",
        cover_url: "1327318717i/2380483",
        page_count: 208,
      },
      {
        isbn: "9791032703281",
        title: "My Hero Academia - Tome 16",
        description:
          "Midoriya et ses camarades affrontent de nouveaux défis en dehors de l'école, avec des conséquences importantes pour leur développement en tant que héros. Ce tome explore davantage les relations entre les personnages et la complexité des luttes intérieures des protagonistes.",
        published: "2018",
        cover_url: "1553970669i/44663034",
        page_count: 192,
      },
      {
        isbn: "9782380711493",
        title: "Spy × Family - Tome 5",
        description:
          "Anya poursuit son objectif de devenir une \"Stella\" à l'école Eden, tandis que Yor continue de jongler entre ses missions d'assassin et sa vie familiale. Ce tome explore de nouveaux aspects des personnages principaux tout en offrant une dose de suspense et d'humour.",
        published: "2021",
        cover_url: "1630239103i/56967942",
        page_count: 208,
      },
      {
        isbn: "9782505005582",
        title: "Naruto - Tome 41",
        description:
          "Ce tome marque un tournant majeur dans l'histoire, alors que Naruto et ses alliés se lancent dans une guerre contre l'Akatsuki. Des batailles épiques ont lieu, et des révélations importantes sur les origines de certains personnages changent la dynamique de la guerre. L'émotion et l'intensité des combats sont à leur apogée.",
        published: "2009",
        cover_url: "1363037606i/6218526",
        page_count: 192,
      },
      {
        isbn: "9782413075424",
        title: "Solo Leveling - Tome 8",
        description:
          "Le tome 8 marque un tournant dans l'histoire. Jinwoo, après avoir obtenu un ingrédient rare, parvient à créer un élixir de vie sacré dans l'espoir de sauver sa mère. Simultanément, une expédition est lancée pour éliminer une menace grandissante sur l'île de Jeju.​ Ce volume met en lumière les chasseurs de rang S, dévoilant leurs forces, leurs faiblesses et leurs interactions. Alors que l'expédition semble bien préparée, des événements inattendus surviennent, mettant en péril la mission et révélant des ennemis d'une puissance inouïe",
        published: "2022",
        cover_url: "1668028642i/63265606",
        page_count: 272,
      },
      {
        isbn: "9782203148888",
        title: "Le château des animaux - Tome 1 : Miss Bengalore",
        description:
          "Dans une ferme isolée, des animaux vivent sous la domination brutale d'un taureau tyrannique et de ses chiens soldats. L'ordre est imposé par la peur et la force, dans une société où règnent l'oppression et l'injustice. Mais parmi les opprimés, quelques voix commencent à s'élever. Une chatte discrète et un lapin imprévisible croisent la route d'un vieux rat sage, porteur d'idées nouvelles. Ensemble, ils vont tenter de semer les graines de la révolte… non pas par la violence, mais par l'intelligence, la ruse et la solidarité.",
        published: "2019",
        cover_url: "1627134325i/50831481",
        page_count: 71,
      },
      {
        isbn: "9782203001107",
        title: "Tintin - Tome 11 : Le Secret de la Licorne",
        description:
          "Tintin achète un modèle réduit de bateau qui intrigue aussitôt son ami le capitaine Haddock, car il est lié à l'histoire de sa famille. En enquêtant sur cet objet mystérieux, Tintin découvre qu'il pourrait être la clé d'un ancien secret oublié depuis des siècles. Ce qui semblait être une simple curiosité va rapidement les entraîner dans une aventure pleine d'énigmes, de poursuites et de découvertes historiques, alors qu'ils tentent de réunir les pièces d'un puzzle menant à un trésor perdu.",
        published: "1993",
        cover_url: "1558670829i/146140",
        page_count: 68,
      },
      {
        isbn: "9782012101401",
        title: "Astérix - Tome 8 : Astérix chez les Bretons",
        description:
          "Quand les légions de César envahissent une île de l'ouest, un cousin d'Astérix vient chercher de l'aide au village gaulois. Fidèles à leur réputation, Astérix et Obélix embarquent pour une mission à l'étranger, armés de courage… et d'un tonneau très spécial. Là-bas, ils découvrent un pays aux coutumes étranges et aux combats insolites, mais aussi un peuple décidé à ne pas se laisser faire. Une aventure pleine d'humour, de jeux de mots et de décalages culturels, comme toujours chez les irréductibles Gaulois.",
        published: "1997",
        cover_url: "1419178691i/900568",
        page_count: 48,
      },
      {
        isbn: "9782505019930",
        title: "Les Vieux Fourneaux – Tome 1 : Ceux qui restent",
        description:
          "Trois amis d'enfance, désormais retraités, n'ont pas perdu leur mordant ni leur sens de la révolte. Avec humour et tendresse, ils naviguent entre souvenirs, regrets et coups de gueule, dans une époque qu'ils ne reconnaissent plus tout à fait. Lorsqu'un événement du passé ressurgit brutalement, l'un d'eux embarque les autres dans un voyage inattendu aux allures de règlement de comptes. Le tout donne une comédie grinçante et humaine sur l'amitié, la vieillesse… et les luttes qui ne s'éteignent jamais vraiment.",
        published: "2014",
        cover_url: "1398683903i/22019317",
        page_count: 56,
      },
      {
        isbn: "9782010008993",
        title: "Les Misérables",
        description:
          "L'histoire épique de Jean Valjean, un ancien forçat qui cherche à se racheter, et de l'inspecteur Javert, qui poursuit sans relâche sa capture. Ce roman explore des thèmes comme la rédemption, la justice, l'amour et la pauvreté dans la société française du XIXe siècle.",
        published: "2014",
        cover_url: "1677818802i/30116949",
        page_count: 343,
      },
      {
        isbn: "9782072895647",
        title: "Le Comte de Monte-Cristo",
        description:
          "Edmond Dantès, un jeune homme accusé à tort de trahison, s'évade du Château d'If et devient le mystérieux Comte de Monte-Cristo. Un chef-d'œuvre de vengeance, de trahison et de rédemption, avec des intrigues palpitantes et des personnages inoubliables.",
        published: "2020",
        cover_url: "1608818220i/56398644",
        page_count: 1264,
      },
      {
        isbn: "9782253088905",
        title: "Orgueil et Préjugés",
        description:
          "Elizabeth Bennet, une jeune femme vive et indépendante, se confronte aux attentes sociales de l'époque et à sa relation complexe avec le mystérieux Mr. Darcy. Une comédie de mœurs, pleine de critiques sociales et d'histoires d'amour.",
        published: "2011",
        cover_url: "1375087857i/11913773",
        page_count: 510,
      },
      {
        isbn: "9782070400669",
        title: "Moby Dick",
        description:
          "Le capitaine Ahab est obsédé par la chasse à Moby Dick, une baleine blanche géante. Ce roman explore des thèmes de destin, d'obsession et de la nature humaine, tout en racontant l'aventure sur les océans.",
        published: "2001",
        cover_url: "1182532294i/1289792",
        page_count: 731,
      },
      {
        isbn: "9782253088752",
        title: "Frankenstein",
        description:
          "Le Dr. Frankenstein créé un monstre à partir de morceaux de cadavres, mais se retrouve horrifié par sa création. Un roman gothique qui interroge la responsabilité scientifique, la solitude et l'éthique.",
        published: "2009",
        cover_url: "1364186726i/7261829",
        page_count: 352,
      },
      {
        isbn: "9782253023388",
        title: "Dracula",
        description:
          "Le comte Dracula, un vampire charismatique, se rend à Londres dans l'intention de répandre son mal. Un classique du genre horrifique qui a défini la figure du vampire et a inspiré de nombreuses adaptations cinématographiques.",
        published: "2009",
        cover_url: "1327268294i/6998329",
        page_count: 604,
      },
      {
        isbn: "9782377352654",
        title: "Les Aventures de Sherlock Holmes",
        description:
          "Le détective Sherlock Holmes, avec son acolyte le Dr Watson, résout des mystères complexes à travers des enquêtes brillantes. Ce recueil regroupe certaines de ses aventures les plus célèbres.",
        published: "2019",
        cover_url: "1598474896i/55134619",
        page_count: 394,
      },
    ];
    const books = await Book.bulkCreate(bookData);
    console.log(bookData.length, "Livres ");

    // join table book-author
    const bookAuthorAssociation = [
      // Romance
      { book_id: 1, author_id: [1] }, // After - Tome 1
      { book_id: 2, author_id: [2] }, // It Ends With Us
      { book_id: 3, author_id: [3] }, // Nos étoiles contraires
      { book_id: 4, author_id: [4] }, // Orgueil et Préjugés
      { book_id: 5, author_id: [5] }, // Twilight
      { book_id: 6, author_id: [6] }, // Avant toi
      { book_id: 7, author_id: [7] }, // The Love Hypothesis

      // Thriller
      { book_id: 8, author_id: [8] }, // La Vérité sur l'affaire Harry Quebert
      { book_id: 9, author_id: [9] }, // Le Chuchoteur
      { book_id: 10, author_id: [10] }, // Gone Girl
      { book_id: 11, author_id: [11] }, // Les Rivières Pourpres
      { book_id: 12, author_id: [12] }, // Shutter Island
      { book_id: 13, author_id: [13] }, // Le Crime de l'Orient-Express
      { book_id: 14, author_id: [14] }, // La Fille du train

      // Fantasy
      { book_id: 15, author_id: [15] }, // Harry Potter - Tome 4
      { book_id: 16, author_id: [16] }, // Le Seigneur des Anneaux - Tome 2
      { book_id: 17, author_id: [17] }, // La Passe-miroir - Tome 3
      { book_id: 18, author_id: [18] }, // L'Assassin royal - Tome 6
      { book_id: 19, author_id: [19] }, // Eragon - Tome 2
      { book_id: 20, author_id: [20] }, // Le Trône de Fer - Tome 5
      { book_id: 21, author_id: [21] }, // Six of Crows - Tome 1

      // Science-fiction
      { book_id: 22, author_id: [22] }, // Dune - Tome 1
      { book_id: 23, author_id: [23] }, // Fondation - Tome 1
      { book_id: 24, author_id: [24] }, // Seul sur Mars
      { book_id: 25, author_id: [25] }, // Neuromancien
      { book_id: 26, author_id: [26] }, // La Servante écarlate
      { book_id: 27, author_id: [27] }, // Hypérion
      { book_id: 28, author_id: [23] }, // Le cycle des robots - Tome 1

      // Développement personnel
      { book_id: 29, author_id: [28] }, // Les Quatre Accords Toltèques
      { book_id: 30, author_id: [29] }, // Un rien peut tout changer !
      { book_id: 31, author_id: [30] }, // Le Pouvoir du moment présent
      { book_id: 32, author_id: [31] }, // Ta deuxième vie commence quand tu comprends
      { book_id: 33, author_id: [32] }, // Miracle Morning
      { book_id: 34, author_id: [33] }, // L'art subtil de s'en foutre

      // Biographie
      { book_id: 35, author_id: [34] }, // Devenir
      { book_id: 36, author_id: [35] }, // Steve Jobs
      { book_id: 37, author_id: [36] }, // Une vie
      { book_id: 38, author_id: [37] }, // Un long chemin vers la liberté
      { book_id: 39, author_id: [38] }, // Moi, Malala
      { book_id: 40, author_id: [39] }, // Le Lambeau

      // Jeunesse
      { book_id: 41, author_id: [40] }, // Hunger Games - Tome 2
      { book_id: 42, author_id: [41] }, // Percy Jackson - Tome 3
      { book_id: 43, author_id: [42] }, // Heartstopper - Tome 1
      { book_id: 44, author_id: [43] }, // La Guerre des clan - Tome 3
      { book_id: 45, author_id: [44] }, // Les Royaumes de Feu - Tome 1
      { book_id: 46, author_id: [45] }, // Le Petit Prince
      { book_id: 47, author_id: [46] }, // Le Journal de Gurty - Tome 1

      // Manga
      { book_id: 48, author_id: 47 }, // Frieren : Beyond Journey's End - Tome 4
      { book_id: 48, author_id: 48 }, // Frieren : Beyond Journey's End - Tome 4
      { book_id: 49, author_id: 49 }, // Les Carnets de l'Apothicaire - Tome 6
      { book_id: 49, author_id: 50 }, // Les Carnets de l'Apothicaire - Tome 6
      { book_id: 49, author_id: 51 }, // Les Carnets de l'Apothicaire - Tome 6
      { book_id: 49, author_id: 52 }, // Les Carnets de l'Apothicaire - Tome 6
      { book_id: 50, author_id: 53 }, // Demon Slayer - Tome 8
      { book_id: 51, author_id: 54 }, // Jujutsu Kaisen - Tome 13
      { book_id: 52, author_id: 55 }, // Naruto - Tome 22
      { book_id: 53, author_id: 56 }, // Death Note - Tome 7
      { book_id: 53, author_id: 57 }, // Death Note - Tome 7
      { book_id: 54, author_id: 58 }, // My Hero Academia - Tome 16
      { book_id: 55, author_id: 59 }, // Spy × Family - Tome 5
      { book_id: 56, author_id: 55 }, // Naruto - Tome 41
      { book_id: 57, author_id: 60 }, // Solo Leveling - Tome 8

      // Bande dessinée
      { book_id: 58, author_id: 61 }, // Le château des animaux - Tome 1
      { book_id: 58, author_id: 62 }, // Le château des animaux - Tome 1
      { book_id: 58, author_id: 63 }, // Le château des animaux - Tome 1
      { book_id: 59, author_id: 64 }, // Tintin - Tome 11
      { book_id: 60, author_id: 65 }, // Astérix - Tome 8
      { book_id: 60, author_id: 66 }, // Astérix - Tome 8
      { book_id: 61, author_id: 67 }, // Les Vieux Fourneaux - Tome 1
      { book_id: 61, author_id: 68 }, // Les Vieux Fourneaux - Tome 1

      // Classique
      { book_id: 62, author_id: [69] }, // Les Misérables
      { book_id: 63, author_id: [70] }, // Le Comte de Monte-Cristo
      { book_id: 64, author_id: [4] }, // Orgueil et Préjugés (Classique)
      { book_id: 65, author_id: [71] }, // Moby Dick
      { book_id: 66, author_id: [72] }, // Frankenstein
      { book_id: 67, author_id: [73] }, // Dracula
      { book_id: 68, author_id: [74] },
    ];

    // Insert associations Book-Author in join table  book_has_author
    await sequelize.models.book_has_author.bulkCreate(bookAuthorAssociation);

    // join table book-category
    const bookCategoryAssociation = [
      { book_id: 1, category_id: 1 }, // After - Tome 1 - Romance
      { book_id: 2, category_id: 1 }, // It Ends With Us - Romance
      { book_id: 3, category_id: 1 }, // Nos étoiles contraires - Romance
      { book_id: 4, category_id: 1 }, // Orgueil et Préjugés - Romance
      { book_id: 5, category_id: 1 }, // Twilight - Romance
      { book_id: 6, category_id: 1 }, // Avant toi - Romance
      { book_id: 7, category_id: 1 }, // The Love Hypothesis - Romance
      { book_id: 8, category_id: 2 }, // La Vérité sur l'affaire Harry Quebert - Thriller
      { book_id: 9, category_id: 2 }, // Le Chuchoteur - Thriller
      { book_id: 10, category_id: 2 }, // Gone Girl - Thriller
      { book_id: 11, category_id: 2 }, // Les Rivières Pourpres - Thriller
      { book_id: 12, category_id: 2 }, // Shutter Island - Thriller
      { book_id: 13, category_id: 2 }, // Le Crime de l'Orient-Express - Thriller
      { book_id: 14, category_id: 2 }, // La Fille du train - Thriller
      { book_id: 15, category_id: 3 }, // Harry Potter - Tome 4 - Fantaisie
      { book_id: 16, category_id: 3 }, // Le Seigneur des Anneaux - Tome 2 - Fantaisie
      { book_id: 17, category_id: 3 }, // La Passe-miroir - Tome 3 - Fantaisie
      { book_id: 18, category_id: 3 }, // L'Assassin royal - Tome 6 - Fantaisie
      { book_id: 19, category_id: 3 }, // Eragon - Tome 2 - Fantaisie
      { book_id: 20, category_id: 3 }, // Le Trône de Fer - Tome 5 - Fantaisie
      { book_id: 21, category_id: 3 }, // Six of Crows - Tome 1 - Fantaisie
      { book_id: 22, category_id: 4 }, // Dune - Tome 1 - Science-fiction
      { book_id: 23, category_id: 4 }, // Fondation - Tome 1 - Science-fiction
      { book_id: 24, category_id: 4 }, // Seul sur Mars - Science-fiction
      { book_id: 25, category_id: 4 }, // Neuromancien - Science-fiction
      { book_id: 26, category_id: 4 }, // La Servante écarlate - Science-fiction
      { book_id: 27, category_id: 4 }, // Hypérion - Science-fiction
      { book_id: 28, category_id: 4 }, // Le cycle des robots - Tome 1 - Science-fiction
      { book_id: 29, category_id: 5 }, // Les Quatre Accords Toltèques - Développement personnel
      { book_id: 30, category_id: 5 }, // Un rien peut tout changer ! - Développement personnel
      { book_id: 31, category_id: 5 }, // Le Pouvoir du moment présent - Développement personnel
      { book_id: 32, category_id: 5 }, // Ta deuxième vie commence quand... - Développement personnel
      { book_id: 33, category_id: 5 }, // Miracle Morning - Développement personnel
      { book_id: 34, category_id: 5 }, // L'art subtil de s'en foutre - Développement personnel
      { book_id: 35, category_id: 6 }, // Devenir - Biographie
      { book_id: 36, category_id: 6 }, // Steve Jobs - Biographie
      { book_id: 37, category_id: 6 }, // Une vie - Biographie
      { book_id: 38, category_id: 6 }, // Un long chemin vers la liberté - Biographie
      { book_id: 39, category_id: 6 }, // Moi, Malala - Biographie
      { book_id: 40, category_id: 6 }, // Le Lambeau - Biographie
      { book_id: 41, category_id: 7 }, // Hunger Games - Tome 2 - Jeunesse
      { book_id: 42, category_id: 7 }, // Percy Jackson - Tome 3 - Jeunesse
      { book_id: 43, category_id: 7 }, // Heartstopper - Tome 1 - Jeunesse
      { book_id: 44, category_id: 7 }, // La Guerre des clan - Tome 3 - Jeunesse
      { book_id: 45, category_id: 7 }, // Les Royaumes de Feu - Tome 1 - Jeunesse
      { book_id: 46, category_id: 7 }, // Le Petit Prince - Jeunesse
      { book_id: 47, category_id: 7 }, // Le Journal de Gurty - Tome 1 - Jeunesse
      { book_id: 48, category_id: 8 }, // Frieren : Beyond Journey's End - Tome 4 - Manga
      { book_id: 49, category_id: 8 }, // Les Carnets de l'Apothicaire - Tome 6 - Manga
      { book_id: 50, category_id: 8 }, // Demon Slayer - Tome 8 - Manga
      { book_id: 51, category_id: 8 }, // Jujutsu Kaisen - Tome 13 - Manga
      { book_id: 52, category_id: 8 }, // Naruto - Tome 22 - Manga
      { book_id: 53, category_id: 8 }, // Death Note - Tome 7 - Manga
      { book_id: 54, category_id: 8 }, // My Hero Academia - Tome 16 - Manga
      { book_id: 55, category_id: 8 }, // Spy × Family - Tome 5 - Manga
      { book_id: 56, category_id: 8 }, // Naruto - Tome 41 - Manga
      { book_id: 57, category_id: 8 }, // Solo Leveling - Tome 8 - Manga
      { book_id: 58, category_id: 9 }, // Le château des animaux - Tome 1 - Bande dessinée
      { book_id: 59, category_id: 9 }, // Tintin - Tome 11 - Bande dessinée
      { book_id: 60, category_id: 9 }, // Astérix - Tome 8 - Bande dessinée
      { book_id: 61, category_id: 9 }, // Les Vieux Fourneaux - Tome 1 - Bande dessinée
      { book_id: 62, category_id: 10 }, // Les Misérables - Classique
      { book_id: 63, category_id: 10 }, // Le Comte de Monte-Cristo - Classique
      { book_id: 64, category_id: 10 }, // Orgueil et Préjugés - Classique
      { book_id: 65, category_id: 10 }, // Moby Dick - Classique
      { book_id: 66, category_id: 10 }, // Frankenstein - Classique
      { book_id: 67, category_id: 10 }, // Dracula - Classique
      { book_id: 68, category_id: 10 },
    ];

    await sequelize.models.book_has_category.bulkCreate(bookCategoryAssociation);
  } catch (error) {
    console.error("Erreur lors du seeding :", error);
  } finally {
    console.log("---");
    console.log("\n✅ Seeding done!\n");

    // Fermer la connexion à la base de données
    await sequelize.close();
  }
}

seedDatabase();
