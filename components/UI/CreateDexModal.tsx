import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateDexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (dexData: any) => void;
}

const CreateDexModal: React.FC<CreateDexModalProps> = ({ isOpen, onClose, onApprove }) => {
  const [formData, setFormData] = useState({
    dexName: '',
    tokenSymbol: '',
    initialLiquidity: '',
    tradingFee: '0.3',
    description: ''
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onApprove(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <h2>{step === 1 ? 'Create Your DEX' : 'Approve DEX Creation'}</h2>
              <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalHeader>

            <ModalBody>
              {step === 1 ? (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>DEX Name</Label>
                    <Input
                      type="text"
                      name="dexName"
                      value={formData.dexName}
                      onChange={handleChange}
                      placeholder="Enter your DEX name"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Token Symbol</Label>
                    <Input
                      type="text"
                      name="tokenSymbol"
                      value={formData.tokenSymbol}
                      onChange={handleChange}
                      placeholder="e.g., TRF"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Initial Liquidity (ATOM)</Label>
                    <Input
                      type="number"
                      name="initialLiquidity"
                      value={formData.initialLiquidity}
                      onChange={handleChange}
                      placeholder="Enter initial liquidity"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Trading Fee (%)</Label>
                    <Input
                      type="number"
                      name="tradingFee"
                      value={formData.tradingFee}
                      onChange={handleChange}
                      step="0.1"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your DEX"
                      required
                    />
                  </FormGroup>

                  <Button type="submit">Next</Button>
                </Form>
              ) : (
                <ApprovalSection>
                  <h3>Review Your DEX Details</h3>
                  <DetailItem>
                    <DetailLabel>DEX Name:</DetailLabel>
                    <DetailValue>{formData.dexName}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Token Symbol:</DetailLabel>
                    <DetailValue>{formData.tokenSymbol}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Initial Liquidity:</DetailLabel>
                    <DetailValue>{formData.initialLiquidity} ATOM</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Trading Fee:</DetailLabel>
                    <DetailValue>{formData.tradingFee}%</DetailValue>
                  </DetailItem>
                  <Warning>
                    Please make sure all details are correct. This action cannot be undone.
                  </Warning>
                  <ButtonGroup>
                    <BackButton onClick={() => setStep(1)}>Back</BackButton>
                    <ApproveButton onClick={handleSubmit}>Approve & Create DEX</ApproveButton>
                  </ButtonGroup>
                </ApprovalSection>
              )}
            </ModalBody>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    color: #000;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Button = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const ApprovalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 6px;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #666;
`;

const DetailValue = styled.span`
  color: #000;
  font-weight: 500;
`;

const Warning = styled.div`
  padding: 12px;
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 6px;
  color: #856404;
  margin: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const BackButton = styled(Button)`
  background: white;
  color: black;
  border: 2px solid black;
  
  &:hover {
    background: #f8f8f8;
  }
`;

const ApproveButton = styled(Button)`
  flex: 1;
`;

export default CreateDexModal;
