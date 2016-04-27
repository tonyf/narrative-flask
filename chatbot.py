# -*- coding: utf-8 -*-
import random

class Chatbot(object):
    questions = ["There’s no time for questions!", "Lola, be reasonable!", "I can’t think of that right now!", "Lola, I’m going to die!", "Stop talking that way, don’t you get it?", "I don’t care about that right now!"]

    starters = ["Lola, what happened?", "Lola, any updates? Please, tell me quickly!", "Lola, have you seen anything? I need to know, tell me everything you saw.", "Are you close yet? Tell me where you are now-- what you are doing, seeing, feeling."]

    extenders = ["Tell me more, I’m waiting.", "Lola, don’t leave me hanging. What happened?", "Lola, I’m going crazy here. Please, give me more details.", "Think of the smallest details: colors, sounds, sights, smells. I know it’s crazy, but I think that might help me come up with an idea.", "Lola, this is not good enough!", "Keep thinking, Lola. We need a better plan."]

    general = ["Lola, we need to think more creatively. What can we do to get the money? Tell me all your ideas.", "If you were a homeless man, what would you do? We need to think of where he might be with all that money.", "My life is in your hands. Are you going to let me die, or are you going to come up with a plan? Just tell me the plan, Lola. Only you can save me.", "You’re my only hope. Tell me how we can get out of this mess.", "What could we do to cause a distraction?", "How do you feel, Lola? Tell me everything. This might be our last chance to talk.", "He’s coming for me, Lola. How are you going to stop him?", "Lola, do you know anyone who could help? Friends, family, anyone?", "I can’t do this without you, Lola.", "Okay, let’s think. If you just stole 100,000 marks, what would you be wearing? Where would you hide the money? What would you be doing?", "Do you still have the gun? Tell me, has anyone seen it? Have you used it? Please, tell me everything.", "Lola, Lola, I think I will die. Tell me something that will make me feel better.", "Hurry, Lola! Who can you talk to get the money? Think of everybody you know.", "Lola, do you believe in heaven? Tell me what will happen to me when I die.", "This is hopeless, isn’t it? Maybe I should just give up now, jump out in the middle of the street and let what happens, happen. What would you do if I did that, Lola? Lola, let’s just forget about the present moment. Let’s imagine we never got in this situation, and you and I were billionaires. What would you buy, what would you do, what would you look like, what would our life be like? Tell me everything, I need to have some pleasant thoughts right now.", "Lola, where are you right now? I need to know everything.", "I don’t even know what to say. I can’t deal with this right now. Lola, tell me a story. Tell me anything. I need to take my mind off things.", "This is a matter of life or death. Quick, tell me a plan that will work.", "I’m counting on you, Lola. You need to come up with something better. Now!", "Lola, please don’t let me down. How are you going to save me?", "Lola, I’m a dead man. What would you do if I die?"]

    def get_response(self, input_text, videoPlayed, isLost):
        if videoPlayed:
            return random.choice(Chatbot.starters)
        if input_text[-1] == '?':
            return random.choice(Chatbot.questions)
        if isLost:
            return random.choice(Chatbot.extenders)
        return random.choice(Chatbot.general)
