import { NextResponse } from "next/server";

type Customer = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
};

const customers: Customer[] = [
  {
    id: "c1",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
  },
  {
    id: "c2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    status: "inactive",
  },
  {
    id: "c3",
    name: "Ahmed Latif",
    email: "ahmed@example.com",
    status: "active",
  },
];

export async function GET() {
  return NextResponse.json({ customers }, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();

  // Very basic validation
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );
  }

  const newCustomer: Customer = {
    id: `c${customers.length + 1}`,
    name: body.name,
    email: body.email,
    status: body.status === "inactive" ? "inactive" : "active",
  };

  customers.push(newCustomer);

  return NextResponse.json({ customer: newCustomer }, { status: 201 });
}
