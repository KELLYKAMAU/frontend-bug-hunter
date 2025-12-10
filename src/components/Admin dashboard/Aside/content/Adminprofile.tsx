
import me2 from "src/assets/me2.jpg";

export default function AdminProfile() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full px-4">
                    <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Profile</h1>

                    {/* Profile Card */}
                    <div className="card bg-black/60 text-white shadow-xl mb-6 rounded-md fullscreen">
                        <div className="card-body p-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="avatar">
                                    <div className="w-60 rounded-full">
        
                                  <img src={me2} alt="Verified Badge" className="avatar" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h2 className="card-title text-2xl">KELLY KAMAU</h2>
                                    <p className="text-lg">Administrator</p>
                                    <p>Email: kamaukelly791@gmail.com</p>
                                    <p>Joined: January 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    );
}