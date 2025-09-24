import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full text-center card-shadow">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Return to Dashboard
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
