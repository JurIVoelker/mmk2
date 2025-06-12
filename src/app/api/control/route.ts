import { ControlEvent, events } from "@/lib/utils";

export async function GET(req: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      events.length = 0;
      const interval = setInterval(() => {
        if (events.length > 0) {
          const event = events.shift();
          if (event) {
            console.log("Sending event:", event);
            controller.enqueue(encoder.encode(`data: ${event}\n\n`));
          }
        }
      }, 50);

      // Verbindung schließen, wenn der Client sie schließt
      const cancel = () => {
        clearInterval(interval);
        controller.close();
      };

      req.signal.addEventListener("abort", cancel);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const event: ControlEvent = body.event;

  if (event) {
    events.push(event);
  }

  return new Response(null, { status: 204 });
}
