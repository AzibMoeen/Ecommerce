import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddressFormDialog = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(false);
  const {setAddress,address} = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/addaddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        console.log('Address added successfully');
        setAddress({
          fullName: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country: '',
          postalCode: '',
          phoneNumber: '',
        });
      } else {
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Address To proceed</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="addressLine1" className="text-right">
              Address Line 1
            </Label>
            <Input
              id="addressLine1"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="addressLine2" className="text-right">
              Address Line 2
            </Label>
            <Input
              id="addressLine2"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={address.city}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="state" className="text-right">
              State
            </Label>
            <Input
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="postalCode" className="text-right">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={address.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            { !loading ? <Button type="submit">Add Address</Button> : <Button type="submit" disabled>Loading...</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressFormDialog;
