import type { Meta, StoryObj } from '@storybook/angular';
import { JobEntryComponent } from './job-entry';
import { Experience } from '../../models/cv.models';

const meta: Meta<JobEntryComponent> = {
  title: 'Components/JobEntry',
  component: JobEntryComponent,
  tags: ['autodocs'],
  argTypes: {
    experience: {
      description: 'The experience data to display'
    }
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<JobEntryComponent>;

const mockExperienceWithLogo: Experience = {
  id: 'exo-current',
  company: 'exo',
  logo: 'assets/logo_exo.png',
  positions: [
    {
      title: 'Directeur, Développement des Logiciels',
      period: '2023-Présent'
    },
    {
      title: 'Chef, Développement des Solutions Transport',
      period: '2019-2023'
    }
  ],
  description: 'Responsable des processus et des ressources de stratégie, livraison et opération de gestion de produits numériques dans un contexte agile',
  responsibilities: [
    'Planifier, diriger et contrôler toutes les activités de la direction',
    'Cultiver le changement et alimenter l\'innovation technologique au sein de l\'entreprise',
    'Évaluer la performance et appliquer les mesures correctives'
  ],
  projects: [
    {
      name: 'Chrono SAEIV',
      description: 'Plateforme de soutien d\'aide à l\'exploitation et information voyageur'
    },
    {
      name: 'Mercure/Infotitre',
      description: 'Plateforme transactionelle de gestion d\'abonnement aux services de transport collectif'
    }
  ]
};

const mockExperienceWithText: Experience = {
  id: 'asi',
  company: 'Adéquat Service Informatique',
  logo: null,
  logoText: 'ASI',
  positions: [
    {
      title: 'IBM: Chargé de Programme',
      period: '2006'
    }
  ],
  description: 'IBM: Gestion de programme',
  responsibilities: [
    'Gérer les budgets du programme',
    'Gérer les ressources IBM et clientèle du programme'
  ],
  projects: [
    {
      name: 'ABN AMRO',
      description: 'Mise en place d\'une entente d\'impartition entre IBM et la filiale francaise de ABN AMRO.'
    }
  ]
};

const mockExperienceMinimal: Experience = {
  id: 'cgi-2',
  company: 'CGI',
  logo: 'assets/logo_cgi.png',
  positions: [
    {
      title: 'Spécialiste Soutien',
      period: '2003-2005'
    }
  ],
  description: '',
  responsibilities: [],
  projects: []
};

export const WithLogoAndProjects: Story = {
  args: {
    experience: mockExperienceWithLogo
  },
};

export const WithTextLogo: Story = {
  args: {
    experience: mockExperienceWithText
  },
};

export const Minimal: Story = {
  args: {
    experience: mockExperienceMinimal
  },
};
