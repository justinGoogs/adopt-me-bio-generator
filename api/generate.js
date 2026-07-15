export default async function handler(request, response) {
    if (request.method !== "POST") {
        return response.status(405).json({ error: "Method not allowed" });
    }

    const petData = request.body;

    const apiKey = process.env.ANTHROPIC_API_KEY;

    try {
        const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                model: "claude-sonnet-5",
                max_tokens: 1024,
                system: "You write warm, honest adoption bios.",
                messages: [
                    { role: "user", content: JSON.stringify(petData) },
                ],
            }),
        });

        const result = await claudeResponse.json();

        return response.status(200).json({ bio: result.content[0].text });
    } catch (error) {
        return response.status(500).json({ error: "Generation failed" });
    }
}