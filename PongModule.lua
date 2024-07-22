if Name ~= 'PongModule' then Name = 'PongModule' end


Handlers.add(
    "pingpong",
    Handlers.utils.hasMatchingData("ping"),
    Handlers.utils.reply("pong")
)
Handlers.add('info', Handlers.utils.hasMatchingTag('Action', 'Info'), function(msg)
    ao.send(
        { Target = msg.From, Tags = { Name = Name } })
end)
