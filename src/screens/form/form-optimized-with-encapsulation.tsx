import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Layout, LayoutMain, LayoutSidebar } from '@/components/core/layout';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { getFruitEmoji } from './utils';

export function FormOptimizedWithEncapsulation() {
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [validating, setValidating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [favoriteFruit, setFavoriteFruit] = useState<string>();

  function handleFieldChange<
    E extends
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | string
  >(handler: (event: E) => void) {
    return (event: E) => {
      validate();
      handler(event);
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setValidating(true);
      validate();
      return;
    }

    toast({
      description: `Thank you ${firstName} ${lastName}! ${getFruitEmoji(
        favoriteFruit
      )}`,
    });
  }

  function validate() {
    const form = formRef.current!;
    setErrors({
      firstName: form.firstName.validationMessage,
      lastName: form.lastName.validationMessage,
      favoriteFruit: form.favoriteFruit.validationMessage,
    });
  }

  return (
    <Layout>
      <LayoutSidebar>
        <div className="p-4">
          <Typography variant="h4" component="h1">
            Form (Optimized with Encapsulation)
          </Typography>
        </div>
      </LayoutSidebar>
      <LayoutMain>
        <form ref={formRef} noValidate onSubmit={handleSubmit}>
          <div className="max-w-sm mx-auto p-6 space-y-6">
            <Typography variant="h4" component="h2">
              My Profile
            </Typography>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                className={cn(
                  validating && errors['firstName'] && 'border-red-500'
                )}
                type="text"
                id="firstName"
                placeholder="First Name"
                required
                value={firstName}
                onChange={handleFieldChange(event =>
                  setFirstName(event.target.value)
                )}
              />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                className={cn(
                  validating && errors['lastName'] && 'border-red-500'
                )}
                type="text"
                id="lastName"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={handleFieldChange(event =>
                  setLastName(event.target.value)
                )}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="aboutMe">About Me</Label>
              <Textarea
                placeholder="Something about yourself."
                id="aboutMe"
                value={aboutMe}
                onChange={handleFieldChange(event =>
                  setAboutMe(event.target.value)
                )}
              />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="favoriteFruitTrigger">Favorite Fruit</Label>
              <Select
                name="favoriteFruit"
                required
                value={favoriteFruit}
                onValueChange={handleFieldChange(value =>
                  setFavoriteFruit(value)
                )}
              >
                <SelectTrigger
                  id="favoriteFruitTrigger"
                  className={cn(
                    validating && errors['favoriteFruit'] && 'border-red-500'
                  )}
                >
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="strawberry">Strawberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Save</Button>
          </div>
        </form>
      </LayoutMain>
    </Layout>
  );
}
