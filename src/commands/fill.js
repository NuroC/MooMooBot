const fetch = require("node-fetch");

async function executeCommand(e, n, t, a, s, l) {
    if (e.member.roles.cache.has("924397464079982654")) {
        if (!n[0] || !n[0].includes(":")) return e.channel.send("Invalid server.");
        if (!n[1] || !["normal", "norm", "sandbox", "sand", "dev"].includes(n[1])) return e.channel.send("Invalid server type.");
        let r;
        if (n[1] = n[1].includes("norm") ? "normal" : n[1].includes("sand") ? "sandbox" : "dev",
            !await s(n[0].split(":")[0], n[0].split(":")[1].split(":")[0], n[1])) return e.channel.send("Invalid server.");
        e.channel.send(t(n)).then(e => {
            r = e.id;
        });
        let i = 0,
            d = 0;
        for (let e in l) {
            let t = await fetch(`https://${l[e]}.glitch.me/sendbot?name=${[ "Nuro", "Wealthy" ][2 * Math.random() | 0]}&server=${n[0]}&type=${n[1]}&amount=4`);
            "Connecting" == (await t.text()).split(" ")[0] ? i++ : d++;
        }
        e.channel.messages.fetch({
            around: r,
            limit: 1
        }).then(e => {
            e.first().edit(a(i, d));
        });
    } else e.reply("You cant use that.");
}

module.exports = executeCommand;
