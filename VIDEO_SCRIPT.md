# 90-second video script (record in YOUR OWN voice - AI voice is not allowed)

Screen recording + voiceover. Partner 1 speaks first half, Partner 2 second half.

**0:00-0:20 (Partner 1) - Intro + Agile plan** (show README on screen)
"Hello, we are <Name 1> and <Name 2>. Our project is a Library Management System. Here is our Agile plan: five user stories, a one-week sprint with a goal of delivering the core catalogue and issue flow with CI/CD, our Definition of Done, and Given-When-Then acceptance criteria for adding a book."

**0:20-0:40 (Partner 1) - Pipeline design** (show ci-cd.yml)
"We used GitHub Actions. The pipeline runs GitHub, then Build with npm ci, Automated Testing with Jest, Code Quality Check with ESLint, and finally Deployment, which builds a Docker image and pushes it to GitHub Container Registry. Deployment only runs on main after tests and quality pass."

**0:40-1:15 (Partner 2) - Live demo** (edit a line, commit, push)
"Now I'll make a small change and push to main. In the Actions tab the pipeline starts. Build is green, Testing passes all six tests, Code Quality passes with zero lint errors, and Deployment pushes the image and the smoke test on the health endpoint succeeds."

**1:15-1:30 (Partner 2) - Wrap-up** (show Packages page or green run)
"Here is the published image. This showed us how CI/CD gives fast feedback and keeps every sprint increment releasable. Thank you."
