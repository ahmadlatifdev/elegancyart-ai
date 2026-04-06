export async function POST(req) {
  try {
    const body = await req.json();
    const { name, job, experience } = body;

    const resume = 
Name: 

Target Role: 

Professional Summary:
Experienced professional with strong background in .
Highly motivated and results-driven with proven ability to deliver value.

Skills:
- Communication
- Problem Solving
- Team Leadership
- Time Management

Experience:
Worked in  with focus on performance, efficiency, and results.
;

    return new Response(JSON.stringify({ success: true, resume }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}
