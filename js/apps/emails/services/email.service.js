// import emailsData from '../services/data/emails.json' assert { type: 'json' }
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const EMAIL_KEY = 'emailDB'


const emailsData = [
  {
    id: 'e101',
    subject: "Password Reset Request for Discord",
    body: `
    Hey Acid, Your Discord password can be reset by clicking the button below. 
    If you did not request a new password, please ignore this email.`,
    isRead: false,
    sentAt: 1656668326189,
    to: "noreply@discord.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e102',
    subject: "guykadosh invited you to guykadosh/travelTip",
    body: `
    You can accept or decline this invitation. 
    
    You can also head over to https://github.com/guykadosh/travelTip to check out the repository or 
    visit @guykadosh to learn a bit more about them. This invitation will expire in 7 days.`,
    isRead: false,
    sentAt: 1655457215189,
    to: "Guy-Kadosh@discord.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e103',
    subject: "Receipt for Your Payment to Google Payment Limited",
    body: "You sent a payment of ₪19.90 ILS to Google Payment Limited (noreply+support@google.com)",
    isRead: false,
    sentAt: 1655457215189,
    to: "service@paypal.co.il",
    state: 'inbox',
    starred: true,
    labels: [],
  },
  {
    id: 'e104',
    subject: "פירוט הזמנה פומודורי פיצה אשדוד",
    body:  `
    היי Denis,
    הזמנתך ממסעדת פומודורי פיצה אשדוד עברה בהצלחה!
    מספר הזמנה	786
    אמצעי תשלום	מזומן ₪85
    כתובת למשלוח	שבט זבולון 9, אשדוד
    זמן הגעה משוער	60-90 דקות
    הערות לשליח	לא לצלצל בפעמון! יש תינוק ישן בבית אל תצלצלו בדלת
    טלפון לבירורים	08-9317888
    *חשוב להיות זמין למקרה של עדכונים בהזמנה
    `,
    isRead: false,
    sentAt: 1655457215189,
    to: "mishloha@mishloha.co.il",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e105',
    subject: "Zoom Invitation from Alen Chernick",
    body:  `
    
    Hi there,

    Alen Chernick would like to connect and add you to a chat on Zoom.
    
    Please click the link below to accept the invitation within 30 days:
    <Link>
    
    If you don't want to accept the invitation, just ignore this message.
    
    Thank you.
    
    
    The Zoom Team`,
    isRead: false,
    sentAt: 1654957215189,
    to: "Zoom@zoom.us",
    state: 'trash',
    starred: false,
    labels: [],
  },
  {
    id: 'e106',
    subject: "Changes to Skrill Account Terms of Use",
    body:  `
      Dear Denis,
      We are writing to let you know that we are making some changes to our terms of use, which will take effect on 18 August 2022 (the “Effective Date”).

      From the Effective Date, if a transaction requires a currency conversion, we will use the Skrill exchange rate which applies at the time we carry out the transaction. The Skrill exchange rate is a reference exchange rate set by us and changes continuously throughout each day. You will be able to find details of the Skrill exchange rate applying at the time, for a conversion between two particular currencies, on the fees section of our website. We will also charge you any applicable foreign exchange fee as we do currently.

      You can read a copy of the updated terms of use which will apply from the Effective Date here.

      If you do not agree to the proposed changes you can close your Skrill account at any time before the Effective Date.

      If you have any questions, please contact us at https://www.skrill.com/en/support

      Yours sincerely,

      The Skrill Team
    `,
    isRead: false,
    sentAt: 1551133930594,
    to: "skrill@news.skrill.com",
    state: 'inbox',
    starred: true,
    labels: [],
  },
  {
    id: 'e107',
    subject: "	Your free trial is over",
    body: `

    Your Avocode free trial is over

    The free trial for Denis Lit's team has ended. 
    Please log in and purchase a subscription within 14 days to keep working on your design projects.
    `,
    isRead: false,
    sentAt: 1654957215189,
    to: "avocode@avocode.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e108',
    subject: "Learn Python Machine Learning [free 2-hour TensorFlow Course]",
    body:  `
    Here are this week's five links that are worth your time:

    1. If you're interested in Data Science and Machine Learning, I recommend this new intermediate-level 
    Python course taught by MIT grad student Kylie Ying. You can code along at home in your browser. 
    You'll use TensorFlow to train Neural Networks, visualize a diabetes dataset, and perform Text Classification on wine reviews. 
    (2 hour YouTube course): https://www.freecodecamp.org/news/text-classification-tensorflow/
    
    2. And if you're relatively new to Data Science, this tutorial will give you a gentle introduction to a lot of key 
    Statistics concepts and terminology. This will make it easier for you to understand more advanced articles about 
    Data Science, Machine Learning, and Scientific Computing in general. (20 minute read): 
    https://www.freecodecamp.org/news/top-statistics-concepts-to-know-before-getting-into-data-science/
    
    3. What is CRUD? You may have heard the term “CRUD app” before to describe a website. It stands for Create, Read, 
    Update, Delete – the 4 essential operations you can do with data. These are what separate a modern website with 
    “dynamic” functionality from the “static” websites pioneered in the 1990s. This short article will explain how 
    these 4 operations power so many dynamic websites. (6 minute read): https://www.freecodecamp.org/news/crud-operations-explained/
    
    4. How to solve the Parking Lot Challenge in JavaScript. You'll use Object-Oriented Programming to build a 
    parking lot that you can fill with cars. Mihail originally created this for his 5 year old daughter to play, 
    but you can learn from it too. (12 minute read): https://www.freecodecamp.org/news/parking-lot-challenge-solved-in-javascript/
    
    5. PDF files are great for certain types of documents. But they can be hard to work with as a developer. 
    This tutorial will give you an overview of popular libraries for working with PDF files. Then it will 
    show you how to extract pages from a PDF and render them using JavaScript. (20 minute read): 
    https://www.freecodecamp.org/news/extract-pdf-pages-render-with-javascript/
    
    It costs quite a bit to run a website like freeCodeCamp.org – with thousands of programming and computer science courses. 
    Please help us cover the cost of running our 100+ servers around the world. 
    Thanks for supporting our charity's mission 🙂 https://www.freecodecamp.org/donate
    
    Quote of the Week: “The future depends on some graduate student who is deeply suspicious of everything I have said.”
     — Geoffrey Hinton, Computer Science professor known as the “Godfather of AI”
    
    Happy coding.
    
    - Quincy Larson
    
    Teacher at https://www.freecodecamp.org
    I share useful things on Twitter at https://www.twitter.com/ossia
    
    If these emails aren't worth your time, you can turn them off: https://www.freecodecamp.org/ue/bNkwt9FuxQU3d7ff0KHvS    
    
    `,
    isRead: false,
    sentAt: 1654957215189,
    to: "quincy@freecodecamp.org",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e109',
    subject: "David L. Rajcher and others share their thoughts on LinkedIn",
    body: `
    David L. Rajcher	David L. Rajcher
    Programming Mentor
    
    Can't wait to see this tweet in 50 years... https://lnkd.in/ebJ8HTvx`,
    isRead: false,
    sentAt: 1654957215189,
    to: "linkedin@linkedin.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e110',
    subject: "ITPM Trader Mentoring Program Intake Q4 2022",
    body:  `
      ITPM Q4 2022 Remote Mentoring Program Intake

      Hi Denis,

      We officially closed our Q3 2022 intake for Remote Trader Mentoring Programs and have been taking bookings 
      for our Q4 2022 intake since June 13th.

      Choose any of our Trading Mentors and complete your 12 Weeks of active trading with real $$$ implementation 
      over Zoom or Skype starting week of October 3rd

      There is also a BIG BONUS when booking your Remote Trader Mentoring Program for Q4 2022. Remote Trader Mentoring
       Programs include ALL ITPM Online Programs with 12 months subscription AND 12 months Data Management subscription.

      THIS IS A TOTAL VALUE OF $10,796 INCLUDED AS PART OF YOUR REMOTE TRADER MENTORING PROGRAM

      PLEASE NOTE: We have also soft launched our April 2023 Thailand Mentoring Program with Anton Kreil and Edward Shek.
      Anton and Ed' are the most popular Mentors at ITPM and if you want to secure your place on this program you will 
      need to get your applications in quickly to secure your spot and before the official program campaign begins in July.

      Go to the document link below and check your preferred Mentors capacity for Q4. Follow the links to make your application;-

      Q4 Mentor Capacity Table CLICK HERE

      PTM 2.0 Video Trailer   CLICK HERE
      PTM 2.0 Infomercial     CLICK HERE


      SEE YOU ON THE OTHER SIDE!


      The Institute Team
    `,
    isRead: false,
    sentAt: 1654257215189,
    to: "education@itpm.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e111',
    subject: "Security alert",
    body:  `
    Dropbox was granted access to your Google Account
	  denslitviak@gmail.com

    If you did not grant access, you should check this activity and secure your account.
    Check activity
    
    `,
    isRead: false,
    sentAt: 1654257215189,
    to: "	Google@accounts.google.com",
    state: 'trash',
    starred: false,
    labels: [],
  },
  {
    id: 'e112',
    subject: "BSW Trading Tournament - $100,000 in BSW to Be Shared!",
    body: `
    How to Get Started?
    Complete a total trading volume of at least 100 BUSD equivalent on any spot, margin, or futures trading pairs.
    
    Learn about “Binance Risk Knowledge” as in the schedule.  
    
    Take up to six quizzes during the activity period (See schedule below) to qualify.
    
     
    
    How to unlock rewards?
    Step 1: From 2022-06-16 00:00 AM to 2022-06-22 11:59 PM (UTC), eligible users will receive the challenge attempt link from the notification center.
    
    Step 2: Click “GO” to make your first challenge attempt.
    
    Step 3: The cursor will rotate and finally stay on the designated square, which is the result of that attempt. 
    Click “GO” to make your next challenge attempt if you receive more than one challenge attempt.
    
    Step 4: To get one more attempt after all your challenge attempts are used up, you can click the “Do it” 
    button next to the spot trading task, and complete the mission in the redirected link during the activity period.`,
    isRead: false,
    sentAt: 1654257215189,
    to: "binance@mailersp1.binance.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e113',
    subject: "Confirm Your Font Awesome Account Email Address",
    body: `
    HEY THERE!
    
    You're so close to using your first Font Awesome Kit!
    We just need you to confirm your email address and finish setting up a new 
    Font Awesome account we created just for you. You can do it super-quickly!
    
    Click to Confirm Your Email Address + Set Things Up`,
    isRead: false,
    sentAt: 1654257215189,
    to: "fontawesome@fontawesome.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e114',
    subject: "ITPM Daily Wrap ",
    body: `
    In Asian Equity Markets stocks wobbled on Thursday as mounting worries about the risks of a global 
    recession amid aggressive rate hikes by the Fed kept broad investor sentiment fragile. 
    MSCI's broadest index of Asia-Pacific shares outside Japan reversed earlier gains to be mostly flat. 
    Stocks in South Korea were off, while Japan's Nikkei was broadly unchanged. Hong Kong's Hang Seng Index climbed 0.6 percent, 
    following the news that Chinese President Xi Jinping chaired a top-level meeting on Wednesday that approved a plan
    for the healthy development of China's large payment firms and fintech sector.



    In Currency Markets the U.S. dollar remained under pressure on Thursday as it looked set to 
    extend declines against major peers to a fourth day, hurt by Treasury yields wallowing near two-week 
    lows amid rising concerns of a recession. The dollar index fell 0.07 percent to 104.14, bringing its decline since 
    Friday to 0.44 percent. The dollar slid 0.56 percent to 135.47 yen, retreating from a 24-year high of 136.71 
    reached on Wednesday. The Aussie fell 0.47 percent to $0.68915. The euro was little changed at $1.0564, while 
    sterling fell 0.1 percent to $1.2253.
    
    
    
    In US Equity Markets main indexes ended with slim losses on Wednesday after choppy trading as energy shares weighed
    and investors digested Federal Reserve Chair Jerome Powell's comments on the central bank's aim to bring down inflation. 
    The Dow fell 0.15 percent, to 30,483.13, the S&P 500 lost 0.13 percent, to 3,759.89 and the Nasdaq 
    Composite lost 0.15 percent, to 11,053.08. The energy sector, which has been a strong performer this year, 
    fell 4.2 percent as oil prices slid. Declines in Exxon Mobil, Chevron and Conocophillips were the biggest individual drags on the S&P 500.
    
    
    
    In Commodities Markets oil prices fell around 3 percent on Wednesday as investors worried that rate hikes 
    by the Federal Reserve could push the U.S. economy into recession, dampening demand for fuel. Brent crude 
    futures fell 2.5 percent, to settle at $111.74 a barrel. U.S. West Texas Intermediate (WTI) fell 3 percent, 
    to settle at $106.19 a barrel. Spot gold rose 0.4 percent to $1,840.39 per ounce and U.S. gold futures settled 
    at $1,838.4. Silver fell 0.9 percent to $21.46 per ounce, platinum was also down 0.9 percent at $928.97, 
    while palladium declined 0.4 percent to $1,869.43.
    
    
    
    In European Equity Markets stocks bounced off session lows on Wednesday after Federal Reserve Chair Jerome
    Powell said the U.S. central bank is "strongly committed" to bringing down inflation. the pan-European STOXX 600 
    closed down 0.7 percent, after having fallen 1.8 percent to its lowest since January 2021. Germany's DAX 
    fell 1.1 percent as BASF slid 5.8 percent after the German chemical group's CEO said the company is likely 
    to face a considerable downturn early in the second half of the year. UK's blue-chip FTSE 100 fell 0.9 percent.
    
    
    
    In Bond Markets U.S. Treasury yields fell to almost two-week lows on Wednesday as fears grew that the Federal 
    Reserve will cause a recession by aggressively tightening monetary policy as it tackles soaring inflation. 
    Two-year Treasury yields fell to 3.056 percent. They have fallen from 3.456 percent on June 14, which was 
    the highest since November 2007. Benchmark 10-year yields were at 3.156 percent, after reaching 3.498 percent 
    on June 14, the highest since April 2011. The closely watched yield curve between two-year and 10-year notes 
    was at 9 basis points, after inverting early last week.
    
    `,
    isRead: false,
    sentAt: 1653757215189,
    to: "education@itpm.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e115',
    subject: "Get started with these popular APIs",
    body: `
    Get the most out of Google Maps Platform
    With over 15 APIs and SDKs there is no limit to what you can build with Google Maps Platform. 
    We’ve put together a list of some of our most popular APIs below to help make getting started easier for you.`,
    isRead: false,
    sentAt: 1653757215189,
    to: "NoReplyGoogleMaps@google.com",
    state: 'inbox',
    starred: false,
    labels: [],
  },
  {
    id: 'e116',
    subject: "Keep Up the Momentum",
    body: `denislit, don't miss your chance at the easiest way to grow your skills and audience on DeviantArt!

    Deviants who favourite at least three deviations are 10 times more likely to have more than 1,000 watchers.
    
    Take a few minutes to favourite three deviations. It makes a big difference, and you'll help us show you more art you like.
    
    Discover Deviations For You`,
    isRead: false,
    sentAt: 1653357215189,
    to: "DeviantArt@deviantart.com",
    state: 'inbox',
    starred: true,
    labels: [],
  },
  {
    id: 's101',
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    sentAt: 1653357215189,
    to: "momo@momo.com",
    state: 'sent',
    starred: false,
    labels: [],
  },
  {
      id: 's102',
      subject: "Program purchase",
      body:  `
      Hi Alin, there seems to be some problem with my email address. 
      Please send everything to this email adress. 
      `,
      isRead: false,
      sentAt: 1653357215189,
      to: "alinpuian@itpm.com",
      state: 'sent',
      starred: false,
      labels: [],
  },
  {
      id: 's104',
      subject: "Footer is the worst",
      body: `
        Hi Guy, im having a hard time with the sprint,
        I just cant seem to be able to get the footer 
        stick to the bottom of the page, any ideas???

      `,
      isRead: false,
      sentAt: 1653357215189,
      to: "guy@gmail.com",
      state: 'draft',
      starred: false,
      labels: [],
  },
  {
      id: 's105',
      subject: "Coding Academy Sign Up",
      body: `
        Hello Coding Academy

      `,
      isRead: false,
      sentAt: 1653357215189,
      to: "CodingAcademy@gmail.com",
      state: 'draft',
      starred: false,
      labels: [],
  },
]


_createEmails()

export const emailService = {
  query,
  remove,
  get,
  save,
}

function query() {
  return storageService.query(EMAIL_KEY)
}

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId)
}

function get(emailId) {
  return storageService.get(EMAIL_KEY, emailId)
}

function save(email) {
  if (email.id) return storageService.put(EMAIL_KEY, email)
  else return storageService.post(EMAIL_KEY, email)
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    emails = emailsData
    utilService.saveToStorage(EMAIL_KEY, emails)
  }
  return emails
}


