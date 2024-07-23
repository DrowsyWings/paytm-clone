import Link from "next/link";

export default function () {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="bg-gradient-to-r from-sky-100 to-indigo-200 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
                  Secure and Seamless Payments
                </h1>
                <p className="max-w-[600px] text-lg text-gray-700 md:text-xl">
                  Experience the future of payments with our cutting-edge
                  platform. Trusted by businesses worldwide.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 200"
                  className="w-full bg-gradient-to-r from-sky-300 to-indigo-200  h-auto"
                >
                  <defs>
                    <linearGradient
                      id="backgroundGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#e0f2fe" />
                      <stop offset="100%" stopColor="#c7d2fe" />
                    </linearGradient>
                  </defs>
                  <rect
                    width="400"
                    height="200"
                    fill="url(#backgroundGradient)"
                  />

                  <path
                    d="M50 150 L100 50 L150 150"
                    fill="none"
                    stroke="#5d3fd3"
                    strokeWidth="12"
                  />

                  <defs>
                    <linearGradient
                      id="textGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#4a1d96" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <text
                    x="250"
                    y="120"
                    fontFamily="Arial, sans-serif"
                    fontSize="48"
                    fontWeight="bold"
                    fill="url(#textGradient)"
                    textAnchor="middle"
                  >
                    CME PAY
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className=" bg-gradient-to-r from-sky-100 to-indigo-200 bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
                  Hear from our satisfied customers and learn why they trust
                  Acme Pay for their payment needs.
                </p>
              </div>
              <div className="grid gap-8">
                <div className="grid gap-8">
                  <div className="rounded-lg border bg-background p-6 shadow-sm">
                    <div className="flex items-start">
                      <div className="ml-4 space-y-1">
                        <h4 className="text-lg font-medium">John Doe</h4>
                        <p className="text-muted-foreground">CEO, Acme Inc.</p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "Acme Pay has been a game-changer for our business. The\n
                      platform is incredibly user-friendly and has helped us\n
                      streamline our payment processes."
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <div className="flex items-start">
                    JD
                    <div className="ml-4 space-y-1">
                      <h4 className="text-lg font-medium">Jane Smith</h4>
                      <p className="text-muted-foreground">
                        CFO, Acme Enterprises
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "Acme Pay has been a game-changer for our business. The\n
                    platform is incredibly user-friendly and has helped us\n
                    streamline our payment processes."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
