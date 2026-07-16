Adopt-Me Bio Generator

A tool that helps animal shelters write honest, engaging adoption profiles without spending hours on each one.

Live demo: https://adopt-me-bio-generator.vercel.app

Why I built this

Anyone who has spent time around an animal shelter knows the people there are stretched thin. There is always more to do than there are hands to do it. The animals need feeding, cleaning, walking, and attention long before anyone gets to sit down and write. Writing a good adoption profile for every animal falls to the bottom of that list, even though a strong profile is one of the things that actually helps an animal find a home.

So shelters end up stuck. The profiles that could move an animal into a home faster are the same profiles nobody has time to write well. A rushed one line description does not do much, and a blank one does even less.

This tool takes that writing off the volunteer's plate. A staff member fills in what they know about the animal, and the tool turns it into a warm, readable bio in a few seconds. The point is not to replace the person. It is to give them their time back so they can get back to the part of the job that matters most, which is caring for the animals.

What it does

A volunteer fills out a form about one animal that covers the basics, health, behavior, personality, backstory, the kind of home that would suit them, and the adoption details. When they hit generate, the tool checks that the important safety questions have been answered, warns them if anything is missing, and then writes a finished adoption profile they can copy straight into a listing.

The design decisions that mattered

The hard part of this project was never getting an AI to write a nice sounding bio. That part is easy. The hard part was making sure the bio is honest, because a profile that oversells an animal or hides a problem leads to a bad match, and a bad match often means the animal comes right back to the shelter. Almost every decision in the tool came out of that one concern.

Some fields are always included. Things like medical conditions, medications, known fears, resource guarding, and bite history are flagged in the form, and the generator is told to never leave them out or water them down. A family deserves to know these things before they take an animal home, and in a lot of places disclosing them is not optional anyway.

Compatibility questions have three answers, not two. For good with dogs, good with cats, good with kids, and good with strangers, the choices are yes, no, and not yet tested. That middle option matters. "We have not tested this animal around cats" is a completely different fact from "this animal is fine with cats," and the tool is built so the AI can never quietly turn one into the other. An untested field stays untested in the bio.

The tool stays quiet about anything it was not told. If a field is left blank, the generator says nothing about that topic instead of making something up. This was the whole reason I built the form the way I did. An AI left on its own will happily invent a charming backstory or a personality trait nobody ever observed, and that is exactly what you do not want in something a shelter is going to publish.

There is a soft warning before generating. If a volunteer skips one of the safety questions, a confirmation appears naming exactly what is missing and asking if they want to continue. It does not block them, because sometimes a shelter genuinely does not know something yet, but it makes skipping a real choice instead of an accident.

The safety information is styled to stand out. In the form, the flagged fields have an amber marker so a busy volunteer's eye goes straight to them, while the rest of the form stays calm and plain so those fields carry the weight.

How it is built

The front end is plain HTML, CSS, and JavaScript with no framework. I wanted to understand every piece rather than lean on something that hides the details.

What I learned building it

I came into this rebuilding my front end skills after being away from code for a while, so a good part of it was working muscles that had gone quiet. A few things stuck with me.

Consistency in the small stuff is not busywork. Keeping field names and values tidy in the HTML felt tedious at the time, but every one of those names became something my JavaScript had to read later, and the sloppy ones turned into real bugs.

A lot of bugs are not in the code. Two of the trickier problems I ran into were not logic errors at all. One only worked after I redeployed, and another was an output box that stayed hidden because the code revealed it in the wrong order. Learning to check the state of things, and not just reread the code, saved me more than once.

Handling secrets is a habit, not an afterthought. Setting the key up as an environment variable from the start, and keeping it out of the repo, is easy when you build it in from the beginning and painful when you do not.

Tech used


HTML, CSS, JavaScript
Claude API (Anthropic)
Vercel for static hosting and the serverless function


What I would build next


A custom confirmation dialog in place of the browser default, so the warning fits the rest of the design
More than one output format from a single set of inputs, like a short social media caption alongside a full listing
Rate limiting on the function so the endpoint cannot be abused
Saved shelter details, so information like the contact line does not have to be typed for every animal
Better formatting of the generated text so paragraph breaks carry through to the output