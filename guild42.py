'''
We organize events in Berne related to software engineering. The focus is to exchange knowledge 
and experience among software developers and software companies. We believe this increases the 
attractiveness of Berne as a location to develop great software!
'''

def ultimateAnswer():
  answer = 0
  counter = 0
  while counter < 9:     # TODO: document magic numbers
    if (answer / 4) < 7:
      answer += 4
    else:
      answer += (counter - 1)
    counter += 1
  return answer + 1

print(ultimateAnswer())