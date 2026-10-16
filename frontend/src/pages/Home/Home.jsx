import { Link } from "react-router-dom";
import PublicNavbar from "../../components/PublicNavbar";

const Home = () => {
    return (
        
        <div className="min-h-screen bg-gray-950 text-white">
            <PublicNavbar />
            {/* Hero Section */}
            <section className="relative overflow-hidden">

                <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 lg:flex lg:items-center lg:gap-12">

                    <div className="max-w-3xl">

                        <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                            AI-POWERED SCHOLARSHIP DISCOVERY
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Find Scholarships
                            <span className="block text-blue-500">
                                Made for You
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                            ScholarAI analyzes your academic, financial,
                            and personal profile to discover scholarships
                            that match your eligibility and interests.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/register"
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                            >
                                Get Started →
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-lg border border-gray-700 px-6 py-3 font-semibold text-gray-200 transition hover:bg-gray-800"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    {/* Hero visual */}
                    <div className="mt-12 lg:mt-0 lg:flex-1">

                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">

                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">
                                        AI Recommendation
                                    </p>

                                    <h3 className="mt-1 font-semibold">
                                        Best Match
                                    </h3>
                                </div>

                                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                                    92% Match
                                </span>
                            </div>

                            <div className="rounded-xl bg-gray-800 p-5">

                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <h3 className="font-semibold">
                                            Engineering Excellence Scholarship
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Merit-based scholarship
                                        </p>
                                    </div>

                                    <span className="font-bold text-green-400">
                                        ₹50,000
                                    </span>

                                </div>

                                <div className="mt-5 grid grid-cols-3 gap-2 text-center">

                                    <div className="rounded-lg bg-gray-900 p-3">
                                        <p className="text-xs text-gray-500">
                                            CGPA
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            8.5+
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-gray-900 p-3">
                                        <p className="text-xs text-gray-500">
                                            Income
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            Eligible
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-gray-900 p-3">
                                        <p className="text-xs text-gray-500">
                                            Course
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            B.Tech
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* Features */}
            <section className="border-y border-gray-800 bg-gray-900/40">

                <div className="mx-auto max-w-6xl px-6 py-16">

                    <div className="text-center">

                        <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                            Why ScholarAI
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            Smarter Scholarship Discovery
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                            Find relevant opportunities without manually
                            checking hundreds of scholarships.
                        </p>

                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">

                        <FeatureCard
                            icon="🎯"
                            title="Personalized Matching"
                            description="Scholarships are matched with your academic, financial, and personal profile."
                        />

                        <FeatureCard
                            icon="🤖"
                            title="AI-Powered Recommendations"
                            description="Semantic search and AI help identify scholarships relevant to your profile."
                        />

                        <FeatureCard
                            icon="⚡"
                            title="Save Time"
                            description="Quickly discover eligible scholarships instead of searching manually."
                        />

                    </div>

                </div>
            </section>

            {/* How It Works */}
            <section>

                <div className="mx-auto max-w-6xl px-6 py-16">

                    <div className="text-center">

                        <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                            Simple Process
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            How It Works
                        </h2>

                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">

                        <Step
                            number="01"
                            title="Create Your Profile"
                            description="Enter your academic, financial, and personal information."
                        />

                        <Step
                            number="02"
                            title="AI Finds Matches"
                            description="Our eligibility engine and semantic search identify relevant scholarships."
                        />

                        <Step
                            number="03"
                            title="Apply"
                            description="Review scholarship details and apply through the official application link."
                        />

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-gray-800">

                <div className="mx-auto max-w-4xl px-6 py-20 text-center">

                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Ready to Find Your Scholarship?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-gray-400">
                        Create your profile and let ScholarAI discover
                        opportunities that match you.
                    </p>

                    <Link
                        to="/register"
                        className="mt-8 inline-block rounded-lg bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-700"
                    >
                        Create Free Account →
                    </Link>

                </div>

            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 bg-gray-950">

                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © {new Date().getFullYear()} ScholarAI
                    </p>

                    <p>
                        AI-Powered Scholarship Recommendation System
                    </p>

                </div>

            </footer>

        </div>
    );
};

const FeatureCard = ({
    icon,
    title,
    description
}) => {
    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

            <div className="text-2xl">
                {icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold">
                {title}
            </h3>

            <p className="mt-2 leading-6 text-gray-400">
                {description}
            </p>

        </div>
    );
};

const Step = ({
    number,
    title,
    description
}) => {
    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

            <span className="text-sm font-bold text-blue-400">
                {number}
            </span>

            <h3 className="mt-4 text-lg font-semibold">
                {title}
            </h3>

            <p className="mt-2 leading-6 text-gray-400">
                {description}
            </p>

        </div>
    );
};

export default Home;