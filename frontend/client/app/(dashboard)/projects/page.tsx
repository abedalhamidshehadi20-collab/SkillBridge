'use client';

// Mock data based on the HTML
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Frontend Migration',
    client: 'Nexus Dynamics',
    status: 'In Progress',
    progress: 75,
    tasks: [
      'Implement responsive dashboard grid',
      'Refactor navigation components',
    ],
    members: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCog5Iglpro6HJrorFhoBEYB4oPH73GFFFftblolDD1WgCjtsZS4aSbFBcERtuv5_gRZYWbIeIJ-PAwIwZkx9l0gUL9RSDSkYIIIOxu_a3xW4BeGwoAwnLp3Obfj8S4qp1I6jZEWTz0c3aJoervVMRhTG3_BUY71lEyy-l3WMv_XVeB4Q5TSNxgA8Y3wMbIGkD9a6sRLe1Hi62Gj45-J9Ea9cRHgu5coPpKV9iXsy05OqmPs7MXh8JqdgDC7iE_9G3qeQQiYDfuVAqv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXin54jqmNjw-H0DKq_m8mIGq3t0FO4WyBPAaycT2DfDr5cUBarJc4pp2O3qpVd9GAwj6uTalxP4rfW7QSW_PmcKv0lmFiCNH3M-7ElR00vWXURH2OUtlCRFNocBh-YbmczYSobsTP_fByJepl7UVB0qUR4uPgj9qYHSlye552psS6vpOkpAe2qqSMcmnR3Y5bH8su_brN__rFoqxe0NSVa4Jdr4GhFAygDdKbt8Bn_yc-RNtsUiJi5GHAhCFuMzUrcbQNXOqHGRm7',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOSkNP7_qP2iqJfQBb3kAla6_Pg7LEdOH7NQh1Kx1PylX7E3lic4yJNvlM1HAG_JQqMQMF7xTA46rQddCUyXQi28ZpgsjXB9yDr_-39UEzzCz4OGwAZnTQW1eWVRZsp3xkNvzQr0m-sANFzpFipnjw91WYl4mftz8e4LIph61pf8vVOp6MGN9QQahyH0kVNakWfMq1wDxgPA4E-mdwSYc0sZSH4S5CUnPN9UJpQV_0-br11DOao3Msi0zbIk-Gs095paTMueJTTz_4',
    ],
  },
  {
    id: '2',
    title: 'Brand Identity',
    client: 'Internal Initiative',
    status: 'Review',
    progress: 90,
    tasks: [
      'Finalize typography guidelines',
      'Present to stakeholders',
    ],
    members: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUqNAxQbMT_Uy-ALMMrEgTw_LhIaq4C4n7P7Q6nWr5KVp_OGQlCpAOT_YY_CYXywcpPDonKOypKwJPGj0osVwC56XgbVmCHPRtSEEipK7Y7Wzzo_LeZd3-SR2RCoSEetpzo9I6SmSFjK8E4sdevhF9sjP5EZoN_CEGQ4XTwlvP-2UezvP_R6oMKUOa55sXq_8SwIe3iZbZT8AMXe6oq1pRjuYLrMvQkW9lJMDZtqM5_O12N4IW1gYdI5wTAsahHxBMqdmi6fxQpUjG',
    ],
    extraMembers: 1,
  },
  {
    id: '3',
    title: 'API Integration',
    client: 'DataFlow Inc',
    status: 'Planning',
    progress: 15,
    tasks: [
      'Draft technical specifications',
      'Set up staging environment',
      'Initial endpoint testing',
    ],
    members: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpqx4cgqsplM02s2LqhSQkSkIHj5XiZDDWXS30x5Xo17dbBzWOumnZjIHGnVldeSUHAgodsEEqjDMB1Nt7ivU1H5wSipbpbRvvQ-krGQmKND3YU5ZoFnxfKFqoS_R-qortaSTiLUqgbDDTuim_1APeDVloeAfwNSbdA-16XwLbZzNV4AnQhpnLU8x3Gu6-d0BQHnfUleW7h7109jq_XskniHpCBANlyv7vghTdGl02eTB_UxzJoyM6h9ymsUJi6P_cnwtzDUX6qjUz',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGU9xEzFdk0pw5CBiiQ8sSBc8gS6qd3W8mwKBwuw4DHJVmApB4hTC22ct7zizkeQKtI5WatageVyd9s923SL2GWZlUEKjJSwfRukAbadUZzEEWam-9sFSFqXw3tuNQ-OvgyUmIg05W3IZiUnngJCTTaL_wFoW0wKqWqnRk-vYH66wiOXGOBT9yK4BhqSoOtF_AK1046D8dGdQYsoqp7gxuaSN8x-EnXWk7G-a5uhwSuvSy_-WYF6yhJM4Jh4Tl6NyA7IZWNnjsTJyQ',
    ],
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case 'In Progress':
      return 'bg-secondary-fixed text-on-secondary-fixed';
    case 'Review':
      return 'bg-tertiary-fixed text-on-tertiary-fixed';
    case 'Planning':
      return 'bg-surface-container-highest text-on-surface border border-outline-variant';
    default:
      return 'bg-surface-container-highest text-on-surface';
  }
}

function getProgressStyle(status: string) {
  switch (status) {
    case 'In Progress':
      return 'bg-primary';
    case 'Review':
      return 'bg-tertiary';
    case 'Planning':
      return 'bg-outline';
    default:
      return 'bg-primary';
  }
}

export default function ProjectsPage() {
  return (
    <div className="flex-1 p-margin md:p-xl max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-xl">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-xs">My Projects</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage your active collaborations and track milestones.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-md py-sm rounded-lg btn-primary-gradient text-on-primary font-label-sm text-label-sm inner-glow shadow-sm hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create New Project
        </button>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {MOCK_PROJECTS.map((project) => (
          <article key={project.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-[2px] flex flex-col h-full">
            <div className="flex justify-between items-start mb-md">
              <div>
                <h3 className="font-h3 text-h3 text-on-surface mb-xs">{project.title}</h3>
                <p className="font-caption text-caption text-on-surface-variant">Client: {project.client}</p>
              </div>
              <span className={`${getStatusStyle(project.status)} font-caption text-caption px-sm py-xs rounded-full whitespace-nowrap`}>
                {project.status}
              </span>
            </div>

            <div className="mb-lg">
              <div className="flex justify-between font-label-sm text-label-sm mb-sm text-on-surface">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-[8px] bg-surface-variant rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getProgressStyle(project.status)}`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-xl flex-1">
              <h4 className="font-label-sm text-label-sm text-on-surface-variant mb-sm">Upcoming Tasks</h4>
              <ul className="space-y-sm">
                {project.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-sm font-body-md text-body-md text-on-surface">
                    <span className="material-symbols-outlined text-[20px] text-outline mt-[2px]">radio_button_unchecked</span>
                    <span className="leading-tight">{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-md border-t border-surface-variant mt-auto">
              <div className="flex -space-x-sm">
                {project.members.map((avatar, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    key={i}
                    className="w-[32px] h-[32px] rounded-full border-2 border-surface-container-lowest object-cover" 
                    alt="Team member avatar" 
                    src={avatar}
                  />
                ))}
                {project.extraMembers && (
                  <div className="w-[32px] h-[32px] rounded-full border-2 border-surface-container-lowest bg-surface-container flex items-center justify-center font-caption text-caption text-on-surface-variant font-medium">
                    +{project.extraMembers}
                  </div>
                )}
              </div>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                more_horiz
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
