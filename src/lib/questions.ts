import { Question } from "./types";

export const questions: Question[] = [
    // Beginner Questions (1-15)
    {
        id: "q1",
        title: "You receive an email from your 'bank' asking for your password. What do you do?",
        answers: [
            "Reply with the password",
            "Click the link and login",
            "Delete it and contact the bank directly",
            "Forward it to a friend"
        ],
        correctAnswer: 2,
        difficulty: 1,
        details: "This is a classic Phishing attempt. Banks never ask for passwords via email. Always verify by contacting them through official channels."
    },
    {
        id: "q2",
        title: "Which password is the strongest?",
        answers: [
            "password123",
            "MyNameIsJohn",
            "Tr0ub4dor&3",
            "12345678"
        ],
        correctAnswer: 2,
        difficulty: 1,
        details: "Strong passwords use a mix of uppercase, lowercase, numbers, and symbols, and are not easily guessable words."
    },
    {
        id: "q3",
        title: "What does HTTPS indicate on a website?",
        answers: [
            "The site is fast",
            "The connection is encrypted",
            "The site is hosted in the US",
            "The site has no ads"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "HTTPS (Hypertext Transfer Protocol Secure) ensures that data transmitted between your browser and the website is encrypted and secure."
    },
    {
        id: "q4",
        title: "What is Two-Factor Authentication (2FA)?",
        answers: [
            "Logging in twice",
            "Using two different passwords",
            "A second verification step (like a code sent to phone)",
            "Sharing your account with a friend"
        ],
        correctAnswer: 2,
        difficulty: 1,
        details: "2FA adds an extra layer of security by requiring a second form of identification beyond just a password."
    },
    {
        id: "q5",
        title: "You find a USB drive in the parking lot. What should you do?",
        answers: [
            "Plug it in to see whose it is",
            "Throw it in the trash",
            "Give it to IT security or police",
            "Format it and keep it"
        ],
        correctAnswer: 2,
        difficulty: 1,
        details: "Unknown USB drives can contain malware that automatically installs when plugged in. Never plug in unknown devices."
    },
    {
        id: "q6",
        title: "What should you do before clicking on a link in an email?",
        answers: [
            "Just click it",
            "Hover over it to see the actual URL",
            "Forward the email first",
            "Reply asking if it's safe"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "Always verify the actual destination by hovering over links. Attackers often disguise malicious URLs with legitimate-looking text."
    },
    {
        id: "q7",
        title: "What is the safest way to connect to public Wi-Fi?",
        answers: [
            "Just connect normally",
            "Use a VPN",
            "Disable your firewall",
            "Share your passwords"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "Public Wi-Fi is often unsecured. A VPN encrypts your connection, protecting your data from eavesdroppers."
    },
    {
        id: "q8",
        title: "How often should you update your software?",
        answers: [
            "Never",
            "Once a year",
            "As soon as updates are available",
            "Only when it stops working"
        ],
        correctAnswer: 2,
        difficulty: 1,
        details: "Software updates often include security patches. Delaying updates leaves you vulnerable to known exploits."
    },
    {
        id: "q9",
        title: "What is a secure way to share sensitive files?",
        answers: [
            "Email attachment",
            "Public cloud folder",
            "Encrypted file-sharing service",
            "Social media DM"
        ],
        correctAnswer: 2,
        difficulty: 1,
        details: "Encrypted file-sharing services protect data in transit and at rest, ensuring only authorized recipients can access files."
    },
    {
        id: "q10",
        title: "What should you do if you suspect your account has been compromised?",
        answers: [
            "Ignore it",
            "Change password immediately and enable 2FA",
            "Delete the account",
            "Wait a few days"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "Quick action is critical. Change your password, enable 2FA, and check for unauthorized activity."
    },
    {
        id: "q11",
        title: "What is 'Spear Phishing'?",
        answers: [
            "Fishing with a spear",
            "Targeted phishing attack on specific individuals",
            "A computer game",
            "A type of firewall"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "Spear phishing is a targeted attack where attackers research victims to craft personalized, convincing messages."
    },
    {
        id: "q12",
        title: "What does a Padlock icon in the browser address bar indicate?",
        answers: [
            "The site is locked",
            "The connection is secure (HTTPS)",
            "You need a password",
            "The site is popular"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "The padlock indicates the site uses HTTPS encryption, protecting data between your browser and the server."
    },
    {
        id: "q13",
        title: "What is the best practice for sharing passwords?",
        answers: [
            "Share via email",
            "Don't share passwords at all",
            "Write them on sticky notes",
            "Post them in chat"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "Passwords should never be shared. Use shared accounts or access management tools if collaboration is needed."
    },
    {
        id: "q14",
        title: "What is a 'Cookie' in web browsing?",
        answers: [
            "A snack",
            "Small data stored by websites on your computer",
            "A virus",
            "An email attachment"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "Cookies store information like login sessions and preferences. While useful, they can also track your browsing habits."
    },
    {
        id: "q15",
        title: "What is the purpose of antivirus software?",
        answers: [
            "Speed up your computer",
            "Detect and remove malware",
            "Increase battery life",
            "Store passwords"
        ],
        correctAnswer: 1,
        difficulty: 1,
        details: "Antivirus software protects against malicious software by scanning, detecting, and removing threats."
    },
    // Advanced Questions (16-35)
    {
        id: "q16",
        title: "What is a 'Man-in-the-Middle' attack?",
        answers: [
            "A physical fight",
            "An attacker intercepting communication between two parties",
            "A server crash",
            "A virus that deletes files"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "A MitM attack involves an attacker secretly relaying and possibly altering the communication between two parties who believe they are directly communicating with each other."
    },
    {
        id: "q17",
        title: "What is 'Ransomware'?",
        answers: [
            "Free software",
            "Malware that encrypts files and demands payment",
            "A firewall tool",
            "A type of hardware"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "Ransomware is malicious software that threatens to publish the victim's data or perpetually block access to it unless a ransom is paid."
    },
    {
        id: "q18",
        title: "What does VPN stand for?",
        answers: [
            "Very Private Network",
            "Virtual Private Network",
            "Visual Protocol Node",
            "Verified Public Network"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "A Virtual Private Network (VPN) extends a private network across a public network and enables users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network."
    },
    {
        id: "q19",
        title: "Which of these is a social engineering attack?",
        answers: [
            "SQL Injection",
            "DDoS",
            "Pretexting",
            "Buffer Overflow"
        ],
        correctAnswer: 2,
        difficulty: 2,
        details: "Pretexting is a form of social engineering where an attacker creates a fabricated scenario (the pretext) to manipulate a victim into providing private information."
    },
    {
        id: "q20",
        title: "What is the purpose of a Firewall?",
        answers: [
            "To cool down the server",
            "To monitor and control network traffic",
            "To speed up internet",
            "To store passwords"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies."
    },
    {
        id: "q21",
        title: "What is 'SQL Injection'?",
        answers: [
            "A medical procedure",
            "A type of attack that inserts malicious SQL code",
            "A database backup",
            "A programming language"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "SQL Injection is a code injection technique that exploits security vulnerabilities in an application's database layer."
    },
    {
        id: "q22",
        title: "What is 'Zero-Day' vulnerability?",
        answers: [
            "A vulnerability discovered and exploited before a patch is available",
            "A bug fixed in zero days",
            "Software that never crashes",
            "Free antivirus software"
        ],
        correctAnswer: 0,
        difficulty: 2,
        details: "A zero-day vulnerability is a security flaw unknown to the software vendor, leaving no time to develop a patch before exploitation."
    },
    {
        id: "q23",
        title: "What does 'DDoS' stand for?",
        answers: [
            "Data Denial of Service",
            "Distributed Denial of Service",
            "Direct Database of Security",
            "Designated Denial System"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "DDoS attacks overwhelm a target's resources by flooding it with internet traffic from multiple sources, making it unavailable."
    },
    {
        id: "q24",
        title: "What is 'Encryption at Rest'?",
        answers: [
            "Encrypting data while it's stored",
            "Encrypting data while sleeping",
            "Not encrypting data",
            "Encrypting emails only"
        ],
        correctAnswer: 0,
        difficulty: 2,
        details: "Encryption at rest protects stored data from unauthorized access, even if physical storage media is compromised."
    },
    {
        id: "q25",
        title: "What is a 'Botnet'?",
        answers: [
            "A fishing net",
            "A network of infected computers controlled remotely",
            "An AI chatbot",
            "A server cluster"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "A botnet is a network of compromised computers (bots) under the control of an attacker, often used for DDoS attacks or spam."
    },
    {
        id: "q26",
        title: "What is 'Penetration Testing'?",
        answers: [
            "Breaking into buildings",
            "Authorized simulated cyber attack to find vulnerabilities",
            "Testing computer speed",
            "Installing software"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "Penetration testing is an authorized simulated attack on a system to identify vulnerabilities before malicious actors can exploit them."
    },
    {
        id: "q27",
        title: "What is the principle of 'Least Privilege'?",
        answers: [
            "Give everyone admin access",
            "Users should have minimum access necessary to perform their job",
            "Share all passwords",
            "Disable all security"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "Least Privilege limits user access rights to only what's necessary, reducing the potential damage from accidents or attacks."
    },
    {
        id: "q28",
        title: "What is a 'Trojan Horse' in cybersecurity?",
        answers: [
            "A wooden horse",
            "Malware disguised as legitimate software",
            "A Greek myth",
            "A type of firewall"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "A Trojan is malicious code or software that appears legitimate but performs harmful actions once installed."
    },
    {
        id: "q29",
        title: "What is 'Multi-Factor Authentication' (MFA)?",
        answers: [
            "Using multiple passwords",
            "Authentication using two or more verification factors",
            "Logging in from multiple devices",
            "Having multiple accounts"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "MFA combines two or more independent credentials (what you know, have, or are) to verify identity, significantly improving security."
    },
    {
        id: "q30",
        title: "What is 'Whitelisting'?",
        answers: [
            "A racist practice",
            "Allowing only approved applications/websites to run",
            "Making text white",
            "Deleting files"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "Whitelisting is a security approach that permits only pre-approved programs or addresses, blocking everything else by default."
    },
    {
        id: "q31",
        title: "What is a 'Keylogger'?",
        answers: [
            "A door key",
            "Software that records keystrokes",
            "A password manager",
            "A keyboard cleaner"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "A keylogger is malware that records everything you type, potentially capturing passwords, credit card numbers, and other sensitive data."
    },
    {
        id: "q32",
        title: "What does 'End-to-End Encryption' mean?",
        answers: [
            "Encryption only at endpoints",
            "Data is encrypted throughout the entire communication path",
            "Encryption that ends eventually",
            "No encryption"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "End-to-end encryption ensures only the sender and intended recipient can read messages, preventing interception by third parties."
    },
    {
        id: "q33",
        title: "What is 'Sandboxing'?",
        answers: [
            "Playing in sand",
            "Running programs in an isolated environment for testing",
            "Deleting files",
            "A type of beach attack"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "Sandboxing isolates programs from the rest of the system, allowing them to run without risking damage to other applications or data."
    },
    {
        id: "q34",
        title: "What is a 'Honeypot' in cybersecurity?",
        answers: [
            "Sweet trap for bees",
            "Decoy system to lure attackers",
            "Password storage",
            "Antivirus software"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "A honeypot is a security mechanism that sets up a decoy system to attract attackers, allowing security teams to study their techniques."
    },
    {
        id: "q35",
        title: "What is 'Data Exfiltration'?",
        answers: [
            "Backing up data",
            "Unauthorized transfer of data from a system",
            "Deleting old files",
            "Creating new folders"
        ],
        correctAnswer: 1,
        difficulty: 2,
        details: "Data exfiltration is the unauthorized transfer of data from a computer or network, often a goal of cyberattacks."
    }
];

// Fisher-Yates shuffle algorithm
export function shuffleQuestions(array: Question[]): Question[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
