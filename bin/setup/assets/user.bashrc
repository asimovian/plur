
#plur: dev aliases
alias gita='git add .'
alias gitd='git diff'
alias gits='git status'
alias gitc='git commit -m'
alias gitp='git pull --rebase'
alias gitr='git rebase -i'
alias gitu='git push'
alias gitac='gita ; gitc'
alias gitrh='gitr HEAD~1'
alias gitpu='gitp && gitu ; gits'
alias gitps='gitp ; gits'

