export default async function handleDEvents(client:any, eventDir:any) {
    for (const file of eventDir) {
        const func:object = await import(`../events/${file}`);
        const event = func['default'];
        event.once ? client.once(event.name, (...args:any) => event.execute(...args, client)) : client.on(event.name, (...args:any) => event.execute(...args, client))
    };
}