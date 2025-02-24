import PublisherRegistrationForm from "../users/[username]/PublisherRegistrationForm";

export default function PublisherRegistrationPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Publisher Registration</h1>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <PublisherRegistrationForm />
      </div>
    </div>
  );
} 