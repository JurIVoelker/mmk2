import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const EnvironmentVariableError = () => {
  return (
    <div className="flex h-[100svh] flex-col gap-4 p-4 items-center justify-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Fehler</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-8">
            {"Umgebungsvariable "}
            <span className="bg-slate-100 px-2 py-1 rounded-md">
              NEXT_PUBLIC_SCRAPING_URL
            </span>
            {" ist nicht gesetzt. Bitte erstelle die Datei "}
            <span className="bg-slate-100 px-2 py-1 rounded-md">src/.env</span>
            {" und setze die Umgebungsvariable: "}
            <span className="bg-slate-100 px-2 py-1 rounded-md">
              NEXT_PUBLIC_SCRAPING_URL=https://example.com
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentVariableError;
