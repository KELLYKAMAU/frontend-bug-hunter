import { Navigation } from "./nav/Navigation";
// import logo from "../assets/logo.png";
import backgroundImage from "../assets/back2.png";
import { Footer } from "./nav/MyFooter";

export default function Landing() {
    return (
    <div
  className="relative min-h-screen bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

    {/* Navigation */}
  <div className="relative z-20">
    <Navigation />
  </div>

    {/* Hero Content */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
    {/* Logo & Intro */}
    <div className="text-center text-white mb-8">
      {/* <img
        src={logo}
        alt="Bug Tracker Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-xl shadow-lg border-2 border-white/20"
      /> */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Welcome Aboard. Let's Track and Fix.</h1>
      <p className="text-lg sm:text-xl max-w-lg mx-auto px-4">
       A comprehensive, centralized solution built to streamline the entire bug-tracking process—empowering teams to identify issues quickly, monitor their progress, collaborate seamlessly, and maintain exceptional software quality throughout every stage of development.

      </p>
    </div>

    {/* Info Boxes */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl w-full px-4">
      {/* Card 1 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-xl sm:text-2xl text-base-content">Why Choose Our product?</h2>
          <p className="text-sm sm:text-base">
            Bug Tracker is your unified solution for identifying, documenting, and managing software bugs in a structured and efficient way. 
            Whether you're running a simple application or coordinating a complex development pipeline across multiple teams, 
            our platform ensures clarity, accountability, and smooth communication—helping you stay focused on delivering stable, high-quality software.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-lg sm:text-xl text-base-content">Why It Matters?</h3>
          <p className="text-sm sm:text-base">
            Say goodbye to scattered issue reports and confusing spreadsheet chaos.
             Bug Tracker gives you a centralized, structured workspace where you can report bugs, 
             set priorities, assign tasks, and collaborate effortlessly
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-lg sm:text-xl text-base-content">Collabos</h3>
          <p className="text-sm sm:text-base">
Thanks to smart notifications and beautifully designed dashboards,
 your entire team stays connected and informed. Developers fix bugs faster,
  testers verify updates instantly,
 and managers keep track of progress with complete clarity and ease.
          </p>
            
           

        </div>
      </div>

      {/* Card 4 */}
      <div className="card bg-black/60 text-white shadow-xl rounded-md">
        <div className="card-body p-4 sm:p-6">
          <h3 className="card-title text-lg sm:text-xl text-base-content">Lets Jump right into it</h3>
          <p className="text-sm sm:text-base">
            Ready to simplify your workflow?
             Sign up or log in to begin tracking your first bug and immediately feel the 
             difference that organized
             streamlined issue management makes.
         
          </p>
          {/* <div className="card-actions justify-end mt-4 flex flex-col sm:flex-row gap-2">
            <button className="btn btn-primary btn-sm sm:btn-md">Get Started</button>
            <button className="btn btn-outline btn-sm sm:btn-md">Learn More</button>
          </div> */}
        </div>
      </div>
    </div>
  </div>

  <Footer/>
</div>

    );
}