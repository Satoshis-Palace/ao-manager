---@diagnostic disable: undefined-field
local json = require('json');
local ao = require('ao');

if not PongModule then PongModule = ""; end;

Handlers.add('PongModule', Handlers.utils.hasMatchingTag('Action', 'UploadPongModule'), function(msg)
    PongModule = msg.Data;
    Utils.result(msg.From, 200, msg.Data);
end)

Handlers.add('Init', Handlers.utils.hasMatchingTag('Action', 'InitModule'), function(msg)
    ao.send({
        Target = msg.PongProcess,
        Action = "Eval",
        Data = PongModule
    })
end)

Utils = {
    result = function(target, code, message)
        ao.send({
            Target = target,
            Data = json.encode({ code = code, message = message })
        });
    end
}
