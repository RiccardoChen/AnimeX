-- MySQL dump 10.13  Distrib 8.4.8, for macos15 (arm64)
--
-- Host: localhost    Database: animex
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Admin','admin@gmail.com','932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef',1),(2,'User','user@gmail.com','ee79976c9380d5e337fc1c095ece8c8f22f91f306ceeb161fa51fecede2c4ba1',2);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anime`
--

DROP TABLE IF EXISTS `anime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anime` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `episode` int DEFAULT NULL,
  `description` text,
  `release_year` int DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `img_url` (`img_url`),
  UNIQUE KEY `video_url` (`video_url`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anime`
--

LOCK TABLES `anime` WRITE;
/*!40000 ALTER TABLE `anime` DISABLE KEYS */;
INSERT INTO `anime` VALUES (2,'Frieren: Beyond Journey\'s End','Adventure, Drama, Fantasy',28,'During their decade-long quest to defeat the Demon King, the members of the hero\'s party—Himmel himself, the priest Heiter, the dwarf warrior Eisen, and the elven mage Frieren—forge bonds through adventures and battles, creating unforgettable precious memories for most of them.However, the time that Frieren spends with her comrades is equivalent to merely a fraction of her life, which has lasted over a thousand years. When the party disbands after their victory, Frieren casually returns to her \'usual\' routine of collecting spells across the continent. Due to her different sense of time, she seemingly holds no strong feelings toward the experiences she went through.As the years pass, Frieren gradually realizes how her days in the hero\'s party truly impacted her. Witnessing the deaths of two of her former companions, Frieren begins to regret having taken their presence for granted; she vows to better understand humans and create real personal connections. Although the story of that once memorable journey has long ended, a new tale is about to begin.',2024,'https://m.media-amazon.com/images/I/81UD99oUK8L._AC_UF894,1000_QL80_.jpg','https://www.youtube.com/embed/ZEkwCGJ3o7M'),(3,'Bleach: Thousand-Year Blood War - The Separation','Adventure, Action,Supernatural',13,'After a brutal surprise attack by the forces of Quincy King Yhwach, the resident Reapers of the Soul Society lick their wounds and mourn their losses. Many of the surviving Soul Reaper captains train to battle without their Bankai, the ultimate technique wielded by the fiercest warriors.In the previous assault, Ichigo Kurosaki narrowly managed to help fend off Yhwach\'s fearsome wrath. However, to ultimately defeat his godly adversary and save his allies, Ichigo must now undergo severe training that will push him beyond his physical, emotional, and mental limits.Though Yhwach already holds the upper hand in this ongoing blood feud, he also successfully recruits Uryuu Ishida, Ichigo\'s close friend and rival, to be his successor. Yhwach strikes out once again at the weakened Soul Society, intent on finally obliterating his long-standing enemies. As Ichigo struggles to attain new power, the Soul Reaper captains fight for survival and borrowed time.',2022,'https://i.ebayimg.com/images/g/jwoAAOSwnlxkF-s1/s-l1200.jpg','https://www.youtube.com/embed/e8YBesRKq_U'),(4,'Orb: On the Movements of the Earth','Historical, Drama',25,'Twelve-year-old prodigy Rafal believes in living rationally, so as to earn praise and respect from society while not being led astray by his emotions. To this end, he publicly states his intention to study theology—the academic field held in highest regard in early 15th century Poland. However, an encounter with a mysterious man upends Rafal\'s life, sparking an illogical desire to instead pursue his passion for astronomy.Rafal is determined to prove the beauty and rationality of heliocentrism—the theory that the Earth revolves around the Sun. This belief is considered heretical by the powerful Church, which promotes geocentrism—the Sun revolving around the Earth—as the sole truth of the universe. Those whose beliefs do not align with the will of the Church suffer unfathomably gruesome consequences.In pursuit of evidence for a heliocentric model of the universe, Rafal grapples with obtaining precise calculations and building empirical theories. His greatest challenge, however, lies in conducting this research discreetly—lest he wish to meet the same fate as other heretics.',2025,'https://external-preview.redd.it/orb-on-the-movements-of-the-earth-key-visual-v0-hC_U4Ph3Ixg5gdHMs3D_5j4qxfGSlMc3rPMeVQeWVmg.jpg?auto=webp&s=307d41fc92bf9673d9e1ca846198aa5ebf549763','https://www.youtube.com/embed/Aju1yusWVKo'),(5,'Your Lie in April','Drama, Romance, School',22,'Kousei Arima is a child prodigy known as the \'Human Metronome\' for playing the piano with precision and perfection. Guided by a strict mother and rigorous training, Kousei dominates every competition he enters, earning the admiration of his musical peers and praise from audiences. When his mother suddenly passes away, the subsequent trauma makes him unable to hear the sound of a piano, and he never takes the stage thereafter.Nowadays, Kousei lives a quiet and unassuming life as a junior high school student alongside his friends Tsubaki Sawabe and Ryouta Watari. While struggling to get over his mother\'s death, he continues to cling to music. His monochrome life turns upside down the day he encounters the eccentric violinist Kaori Miyazono, who thrusts him back into the spotlight as her accompanist. Through a little lie, these two young musicians grow closer together as Kaori tries to fill Kousei\'s world with color.',2015,'https://rukminim2.flixcart.com/image/850/1000/jxf05u80/poster/v/g/2/medium-and-anime-your-lie-in-april-kaori-miyazono-kousei-arima-original-imaf9kyhys3rthus.jpeg?q=20&crop=false','https://www.youtube.com/embed/aMJpI_fEsA4'),(6,'Cyberpunk: Edgerunners','Action, Sci-Fi, Romance',10,'Dreams are doomed to die in Night City, a futuristic Californian metropolis. As a teenager living in the city\'s slums, David Martinez is trying to fulfill his mother\'s lifelong wish for him to reach the top of Arasaka, the world\'s leading security corporation. To this end, he attends the prestigious Arasaka Academy while his mother works tirelessly to keep their family afloat.When an incident with a street gang leaves David\'s life in tatters, he stumbles upon Sandevistan cyberware—a prosthetic that grants its wearer superhuman speed. Fueled by rage, David implants the device in his back, using it to exact revenge on one of his tormentors. This gets him expelled from the academy, shattering his hopes of ever making his mother proud.After witnessing David\'s newfound abilities, the beautiful data thief Lucyna \'Lucy\' Kushinada offers to team up with him, handing him a ticket to salvation. However, associating with Lucy introduces David to the world of Edgerunners—cyborg criminals who will break any law for money. Edgerunners often lose their lives, if the cyberware does not break their minds first; but in his fight for survival inside a corrupt system, David is ready to risk it all.',2022,'https://i.etsystatic.com/35704812/r/il/f3c94d/4288157745/il_fullxfull.4288157745_4vz6.jpg','https://www.youtube.com/embed/JtqIas3bYhg'),(7,'The Disappearance of Haruhi Suzumiya','Mystery, Sci-Fi, Supernatural, School',1,'On a cold December day, Kyon arrives at school prepared for another outing with his fellow SOS Brigade members. However, much to his surprise, he discovers that almost everything has changed completely: Haruhi Suzumiya and Itsuki Koizumi are nowhere to be found; Mikuru Asahina does not recognize him at all; Yuki Nagato is a regular human; and Ryouko Asakura has mysteriously returned. Although he is no stranger to the supernatural, Kyon is disturbed by this odd turn of events and decides to investigate on his own.Finding himself to be the only person that is aware of the previous reality, Kyon is now faced with a difficult choice: to finally live the normal life he has always wanted, or uncover a way to turn back the hands of time and restore his chaotic yet familiar world.',2010,'https://m.media-amazon.com/images/I/61MDuT6LujL._AC_UF1000,1000_QL80_.jpg','https://www.youtube.com/embed/eHKyNQopYXo'),(8,'Death Note','Supernatural, Suspense',37,'Brutal murders, petty thefts, and senseless violence pollute the human world. In contrast, the realm of death gods is a humdrum, unchanging gambling den. The ingenious 17-year-old Japanese student Light Yagami and sadistic god of death Ryuk share one belief: their worlds are rotten.For his own amusement, Ryuk drops his Death Note into the human world. Light stumbles upon it, deeming the first of its rules ridiculous: the human whose name is written in this note shall die. However, the temptation is too great, and Light experiments by writing a felon\'s name, which disturbingly enacts his first murder.Aware of the terrifying godlike power that has fallen into his hands, Light—under the alias Kira—follows his wicked sense of justice with the ultimate goal of cleansing the world of all evil-doers. The meticulous mastermind detective L is already on his trail, but as Light\'s brilliance rivals L\'s, the grand chase for Kira turns into an intense battle of wits that can only end when one of them is dead.',2007,'https://images.wall-art.de/format:webp/q:92/rs:fit:780:/_img/out/pictures/master/product/1/28405.jpg','https://www.youtube.com/embed/Vt_3c8BgxV4'),(9,'JoJo\'s Bizarre Adventure: Golden Wind','Action, Adventure',39,'In the coastal city of Naples, corruption is teeming—the police blatantly conspire with outlaws, drugs run rampant around the youth, and the mafia governs the streets with an iron fist. However, various fateful encounters will soon occur.Enter Giorno Giovanna, a 15-year-old boy with an eccentric connection to the Joestar family, who makes a living out of part-time jobs and pickpocketing. Furthermore, he is gifted with the unexplained Stand ability to give and create life—growing plants from the ground and turning inanimate objects into live animals, an ability he has dubbed \'Gold Experience.\'\' Fascinated by the might of local gangsters, Giorno has dreamed of rising up in their ranks and becoming a \'Gang-Star,\'\' a feat made possible by his encounter with Bruno Bucciarati, a member of the Passione gang with his own sense of justice.JoJo no Kimyou na Bouken: Ougon no Kaze follows the endeavors of Giorno after joining Bruno\'s team while working under Passione, fending off other gangsters and secretly plotting to overthrow their mysterious boss.',2019,'https://m.media-amazon.com/images/I/91CG9Ndd+IL.jpg','https://www.youtube.com/embed/R92KmKcg07Y'),(10,'Jujutsu Kaisen','Action, School, Supernatural',24,'Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the King of Curses.Yuuji experiences first-hand the threat these Curses pose to society as he discovers his own newfound powers. Introduced to the Tokyo Prefectural Jujutsu High School, he begins to walk down a path from which he cannot return—the path of a Jujutsu sorcerer.',2021,'https://m.media-amazon.com/images/I/818DUzqnwES.jpg','https://www.youtube.com/embed/4A_X-Dvl0ws'),(11,'Violet Evergarden','Drama, Romance',13,'The Great War finally came to an end after four long years of conflict; fractured in two, the continent of Telesis slowly began to flourish once again. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines. Hospitalized and maimed in a bloody skirmish during the War\'s final leg, she was left with only words from the person she held dearest, but with no understanding of their meaning.Recovering from her wounds, Violet starts a new life working at CH Postal Services after a falling out with her new intended guardian family. There, she witnesses by pure chance the work of an \'Auto Memory Doll,\' amanuenses that transcribe people\'s thoughts and feelings into words on paper. Moved by the notion, Violet begins work as an Auto Memory Doll, a trade that will take her on an adventure, one that will reshape the lives of her clients and hopefully lead to self-discovery.',2018,'https://m.media-amazon.com/images/M/MV5BOWUyNDFjOWUtNGM5MS00YTUzLWFhYzYtZDg5NDNjMWJiY2MyXkEyXkFqcGc@._V1_.jpg','https://www.youtube.com/embed/g5xWqjFglsk'),(12,'Mushoku Tensei: Jobless Reincarnation Part 2','Adventure, Drama, Fantasy, Isekai',12,'After the mysterious mana calamity, Rudeus Greyrat and his fierce student Eris Boreas Greyrat are teleported to the Demon Continent. There, they team up with their newfound companion Ruijerd Supardia—the former leader of the Superd\'s Warrior group—to form \'Dead End,\'\' a successful adventurer party. Making a name for themselves, the trio journeys across the continent to make their way back home to Fittoa.Following the advice he received from the faceless god Hitogami, Rudeus saves Kishirika Kishirisu, the Great Emperor of the Demon World, who rewards him by granting him a strange power. Now, as Rudeus masters the powerful ability that offers a number of new opportunities, it might prove to be more than what he bargained for when unexpected dangers threaten to hinder their travels.',2021,'https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2021/08/Mushoku-Tensei-2nd-cour-visual-2.jpg?resize=696%2C984&ssl=1','https://www.youtube.com/embed/BbbRytVhaDs'),(13,'Made in Abyss','Adventure, Drama, Fantasy, Mystery, Sci-Fi',13,'The Abyss—a gaping chasm stretching down into the depths of the earth, filled with mysterious creatures and relics from a time long past. How did it come to be? What lies at the bottom? Countless brave individuals, known as Divers, have sought to solve these mysteries of the Abyss, fearlessly descending into its darkest realms. The best and bravest of the Divers, the White Whistles, are hailed as legends by those who remain on the surface.Riko, daughter of the missing White Whistle Lyza the Annihilator, aspires to become like her mother and explore the furthest reaches of the Abyss. However, just a novice Red Whistle herself, she is only permitted to roam its most upper layer. Even so, Riko has a chance encounter with a mysterious robot with the appearance of an ordinary young boy. She comes to name him Reg, and he has no recollection of the events preceding his discovery. Certain that the technology to create Reg must come from deep within the Abyss, the two decide to venture forth into the chasm to recover his memories and see the bottom of the great pit with their own eyes. However, they know not of the harsh reality that is the true existence of the Abyss.',2017,'https://m.media-amazon.com/images/M/MV5BZjM4ODA5YTktNjliMC00NzI5LTk3ZTctZWYyYWEyNTJhMmQzXkEyXkFqcGc@._V1_.jpg','https://www.youtube.com/embed/AQbaZeby2zA'),(14,'Re:ZERO -Starting Life in Another World- Season 3','Drama, Fantasy, Suspense, Isekai',16,'One year after the events at the Sanctuary, Subaru Natsuki trains hard to better face future challenges. The peaceful days come to an end when Emilia receives an invitation to a meeting in the Watergate City of Priestella from none other than Anastasia Hoshin, one of her rivals in the royal selection. Considering the meeting\'s significance and the potential dangers Emilia could face, Subaru and his friends accompany her.However, as Subaru reconnects with old associates and companions in Priestella, new formidable foes emerge. Driven by fanatical motivations and engaging in ruthless methods to achieve their ambitions, the new enemy targets Emilia and threaten the very existence of the city. Rallying his allies, Subaru must give his all once more to stop their nefarious goals from becoming a concrete reality.',2025,'https://preview.redd.it/media-re-zero-season-3-new-key-visual-v0-tdsjdgh9grhd1.jpeg?auto=webp&s=994a1efffca2eddd73144415bcdf44473c4c649a','https://www.youtube.com/embed/qMJNdQFPaHk'),(17,'Clannad: After Story','Drama, Romance',24,'Tomoya Okazaki and Nagisa Furukawa have graduated from high school, and together, they experience the emotional rollercoaster of growing up. Unable to decide on a course for his future, Tomoya learns the value of a strong work ethic and discovers the strength of Nagisa\'s support. Through the couple\'s dedication and unity of purpose, they push forward to confront their personal problems, deepen their old relationships, and create new bonds. Time also moves on in the Illusionary World. As the plains grow cold with the approach of winter, the Illusionary Girl and the Garbage Doll are presented with a difficult situation that reveals the World\'s true purpose.',2008,'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhooensdqheva8z7bTEEzzAEWRYNWmNDs0_n2RHejm8CyW9ad57vXOgzr3qRqAB6kGx-lIk7wtsbTGSeGBJQXpeloC845eedVVVPkaizfwbkwOxe3JUG7nft5mwhmQ1OBYvCDW6SKda_Mo/s400/Clannad+After+Story.jpg','https://www.youtube.com/embed/WiTwXIAcm5Q'),(21,'The Rising of the Shield Hero','Adventure, Action, Fantasy, Drama, Isekai',25,'The Four Cardinal Heroes are a group of ordinary men from modern-day Japan summoned to the kingdom of Melromarc to become its saviors. Melromarc is a country plagued by the Waves of Catastrophe that have repeatedly ravaged the land and brought disaster to its citizens for centuries. The four heroes are respectively bestowed a sword, spear, bow, and shield to vanquish these Waves. Naofumi Iwatani, an otaku, becomes cursed with the fate of being the \'Shield Hero.\' Armed with only a measly shield, Naofumi is belittled and ridiculed by his fellow heroes and the kingdom\'s people due to his weak offensive capabilities and lackluster personality. When the heroes are provided with resources and comrades to train with, Naofumi sets out with the only person willing to train alongside him, Malty Melromarc. He is soon betrayed by her, however, and becomes falsely accused of taking advantage of her. Naofumi then becomes heavily discriminated against and hated by the people of Melromarc for something he didn\'t do. With a raging storm of hurt and mistrust in his heart, Naofumi begins his journey of strengthening himself and his reputation. Further along however, the difficulty of being on his own sets in, so Naofumi buys a demi-human slave on the verge of death named Raphtalia to accompany him on his travels. As the Waves approach the kingdom, Naofumi and Raphtalia must fight for the survival of the kingdom and protect the people of Melromarc from their ill-fated future.',2019,'https://m.media-amazon.com/images/I/81YJ8CeI7hL._AC_UF1000,1000_QL80_DpWeblab_.jpg','https://www.youtube.com/embed/h3n-chI028E'),(22,'Jujutsu Kaisen Season 2','Action, Supernatural',23,'The year is 2006, and the halls of Tokyo Prefectural Jujutsu High School echo with the endless bickering and intense debate between two inseparable best friends. Exuding unshakeable confidence, Satoru Gojou and Suguru Getou believe there is no challenge too great for young and powerful Special Grade sorcerers such as themselves. They are tasked with safely delivering a sensible girl named Riko Amanai to the entity whose existence is the very essence of the jujutsu world. However, the mission plunges them into an exhausting swirl of moral conflict that threatens to destroy the already feeble amity between sorcerers and ordinary humans. Twelve years later, students and sorcerers are the frontline defense against the rising number of high-level curses born from humans\' negative emotions. As the entities grow in power, their self-awareness and ambition increase too. The curses unite for the common goal of eradicating humans and creating a world of only cursed energy users, led by a dangerous, ancient cursed spirit. To dispose of their greatest obstacle—the strongest sorcerer, Gojou—they orchestrate an attack at Shibuya Station on Halloween. Dividing into teams, the sorcerers enter the fight prepared to risk everything to protect the innocent and their own kind.',2023,'https://comicbook.com/wp-content/uploads/sites/4/2023/08/c978d7c1-b2ab-4965-b712-f1b5bd50711e.jpg?w=1024','https://www.youtube.com/embed/PKHQuQF1S8k'),(23,'Hunter x Hunter','Drama, Adventure, Fantasy',148,'Hunters devote themselves to accomplishing hazardous tasks, all from traversing the world\'s uncharted territories to locating rare items and monsters. Before becoming a Hunter, one must pass the Hunter Examination—a high-risk selection process in which most applicants end up handicapped or worse, deceased. Ambitious participants who challenge the notorious exam carry their own reason. What drives 12-year-old Gon Freecss is finding Ging, his father and a Hunter himself. Believing that he will meet his father by becoming a Hunter, Gon takes the first step to walk the same path. During the Hunter Examination, Gon befriends the medical student Leorio Paladiknight, the vindictive Kurapika, and ex-assassin Killua Zoldyck. While their motives vastly differ from each other, they band together for a common goal and begin to venture into a perilous world.',2011,'https://www.fumetto-online.it/ew/ew_albi/images/ABYSTYLE/ABYDCO549%20HUNTER%20X%20HUNTER%20POSTER%20PHANTOM%20TROUPE.jpg','https://www.youtube.com/embed/D9iTQRB4XRk'),(24,'Jujutsu Kaisen: The Culling Game Part 1','Action, Supernatural',12,'ujutsu Kaisen: The Culling Game – Part 1 dives into the brutal aftermath of the Shibuya Incident, where the world of jujutsu is left shattered and the stakes are deadlier than ever. With Satoru Gojo sealed and society thrown into chaos, Kenjaku initiates the Culling Game—a twisted, large-scale ritual forcing sorcerers and newly awakened players into deadly colonies where killing is the only way to survive. Yuji Itadori, Megumi Fushiguro, and their allies enter the game not just to live, but to change its cruel rules, rescue innocent participants, and stop Kenjaku’s plan before it reaches its final stage. As ancient sorcerers clash with modern fighters, Part 1 focuses on the opening colonies, explosive new abilities, and moral dilemmas that test how far the characters are willing to go to protect others—without losing themselves.',2026,'https://cdn.myanimelist.net/s/common/uploaded_files/1766207261-eb2d98cbb991bc66987ac3869ed3d00c.jpeg','https://www.youtube.com/embed/MPfZhgLiK6w'),(25,'My Hero Academia Final Season','Action, Supernatural, Adventure',11,'Izuku Midoriya faces his greatest trial yet as the true successor of One For All, carrying not only immense power but the weight of everyone he’s trying to save. All For One and Tomura Shigaraki push their destructive ideals to the limit, forcing heroes to confront the consequences of a society built on fragile symbols and broken systems. Old rivalries reach their end, hidden truths come to light, and every character—student and pro alike—must decide what it truly means to be a hero. Epic battles, devastating sacrifices, and long-awaited resolutions define the Final Season, delivering a powerful farewell to the world of quirks. It’s the culmination of hope versus despair, legacy versus freedom—and the final answer to the question My Hero Academia has asked from the very beginning: what does it mean to be a true hero?',2025,'https://i.redd.it/eswajb8zg0df1.jpeg','https://www.youtube.com/embed/zz37nGym3OQ'),(26,'Gachiakuta','Action, Fantasy, Adventure',24,'The inhabitants of a certain wealthy town think nothing of throwing objects away. However, their waste is priceless to Rudo, a resident of the town\'s slums. Despite the constant warnings from his adoptive father Regto, Rudo spends his days searching for reusable materials that would otherwise be sent to the giant disposal area known as the Pit. Due to its vastness, the Pit doubles as a means of criminal punishment; those dropped in are never to return again. When Regto is murdered by a mysterious assailant, Rudo is falsely accused of the crime and thrown into the Pit. To his surprise, he awakens in a trash-filled area inhabited by enormous monsters formed from the junk. As the toxic air and Trash Beasts push Rudo to the brink of death, he is saved by Enjin, one of the Cleaners who wield weapons known as Vital Instruments to fight the monstrosities. Having gained his own Vital Instrument, Rudo soon joins the Cleaners in the hopes of finding a way to escape the Pit and avenge his father.',2025,'https://preview.redd.it/gachiakuta-anime-key-visual-v0-eldxf0cpg75f1.jpeg?width=640&crop=smart&auto=webp&s=2c0286a439b0913ad569331d83b89961c7690add','https://www.youtube.com/embed/yeRvDchyo44'),(27,'Sakamoto Days Part 2','Action, Comedy',11,'The legendary former hitman Tarou Sakamoto has thwarted numerous assassins after an enormous bounty on his head was issued. But he cannot seem to catch a break and simply take it easy with his beloved family. A mysterious and infamous figure known as Slur has brought a group of insane death row inmates to Japan, who hold back from nothing to eliminate their targets. Sakamoto is not the only target—the criminals have been assigned to kill various other people, including the new hires at Sakamoto\'s convenience store, Shin Asakura and Lu Shaotang. The situation escalates even further when the Order, a group of the most skilled Japanese assassins, becomes involved. As the inmates begin wreaking havoc, Sakamoto and his allies must remain vigilant for the sake of everything they hold dear.',2025,'https://www.animationmagazine.net/wordpress/wp-content/uploads/Sakamoto-Days-Part-2.jpg','https://www.youtube.com/embed/ZCHwvfQlQ4M');
/*!40000 ALTER TABLE `anime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_id` (`account_id`),
  CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'Admin','undefined',NULL,1),(2,'User','undefined',NULL,2);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_anime`
--

DROP TABLE IF EXISTS `profile_anime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_anime` (
  `profile_id` bigint NOT NULL,
  `anime_id` bigint NOT NULL,
  PRIMARY KEY (`profile_id`,`anime_id`),
  KEY `anime_id` (`anime_id`),
  CONSTRAINT `profile_anime_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`),
  CONSTRAINT `profile_anime_ibfk_2` FOREIGN KEY (`anime_id`) REFERENCES `anime` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_anime`
--

LOCK TABLES `profile_anime` WRITE;
/*!40000 ALTER TABLE `profile_anime` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_anime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` enum('Admin','User') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05 16:02:46
