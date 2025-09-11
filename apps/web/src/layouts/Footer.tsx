import Logo from "@repo/ui/components/Logo";

export default function Footer() {
  return (
    <>
      <footer className="bg-white border-t mt-10 text-gray-800 font-poppins">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Spoona Brand */}
          <div>
            <h2 className="mb-3">
              <Logo />
            </h2>
            <p className="text-sm">
              Discover, share & enjoy delicious recipes with our vibrant
              food-loving community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Post a Recipe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Join Communities
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Save Meals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Add Ingredients
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Top Creators
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Recent Comments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Popular Recipes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Meal Planner
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-orange-400">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="hover:text-orange-400">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#" className="hover:text-orange-400">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 text-center text-sm py-4">
          © {new Date().getFullYear()} Spoona. All rights reserved.
        </div>
      </footer>
    </>
  );
}
